import Job from "../models/jobModel.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/customErrors.js";
import mongoose from "mongoose";
import day from "dayjs";

export const getAllJobs = async (req, res) => {
    const userId = req.user.userId;
    console.log(req.query);

    const { search, jobStatus, jobType, sort } = req.query;

    const queryObject = {
        createdBy: userId,
    };

    if (search) {
        queryObject.$or = [
            { position: { $regex: search, $options: "i" } },
            { company: { $regex: search, $options: "i" } },
        ];
    }

    if (jobStatus && jobStatus !== "all") {
        queryObject.jobStatus = jobStatus;
    }

    if (jobType && jobType !== "all") {
        queryObject.jobType = jobType;
    }

    const sortOptions = {
        newest: "-createdAt",
        oldest: "createdAt",
        "a-z": "position",
        "z-a": "-position",
    };

    const sorkey = sortOptions[sort] || sortOptions.newest;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const jobs = await Job.find(queryObject)
        .sort(sorkey)
        .skip(skip)
        .limit(limit);
    const totalJobs = await Job.countDocuments(queryObject);
    const numOfPage = Math.ceil(totalJobs / limit);
    res.status(StatusCodes.OK).json({
        totalJobs,
        numOfPage,
        jobs,
        page,
        limit,
    });
};

export const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const createdJob = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({
        msg: "Created a job",
        job: createdJob,
    });
};

export const getJob = async (req, res) => {
    const { id } = req.params;
    const job = await Job.findById(id);
    res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
    const { id } = req.params;
    const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });
    res.status(StatusCodes.OK).json({ job: updatedJob });
};

export const deletejob = async (req, res) => {
    const { id } = req.params;
    const deletedJob = await Job.findByIdAndDelete(id);
    res.status(StatusCodes.OK).json({ job: deletedJob });
};

export const showStats = async (req, res) => {
    let stats = await Job.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
    ]);
    // console.log(stats);

    stats = stats.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
    }, {});

    // console.log(stats);

    let monthlyApplications = await Job.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        {
            $group: {
                _id: {
                    year: { $year: "$createdAt" },
                    month: { $month: "$createdAt" },
                },
                count: { $sum: 1 },
            },
        },
        { $sort: { "_id.year": -1, "_id.month": -1 } },
        { $limit: 6 },
    ]);

    // console.log(monthlyApplications);

    monthlyApplications = monthlyApplications.map((item) => {
        const { year, month } = item._id;
        return {
            date: day().month(month).year(year).format("MMM YY"),
            count: item.count,
        };
    });

    console.log(monthlyApplications);
    res.status(StatusCodes.OK).json({ stats, monthlyApplications });
};
