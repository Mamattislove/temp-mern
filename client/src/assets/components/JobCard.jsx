import day from "dayjs";
import { FaCalendar, FaLocationArrow, FaBriefcase } from "react-icons/fa";
import { Link, Form } from "react-router-dom";

const JobCard = ({ job }) => {
    const date = day(job.createdAt).format("MMM D, YYYY");
    return (
        <div className="w-full bg-white mt-5 p-5 rounded-md text-slate-500 shadow-xl">
            <div className="flex">
                <h1 className="bg-teal-400 w-12 h-12 flex justify-center align-middle rounded-md">
                    <span className="block my-auto text-white text-xl h-fit font-extrabold">
                        {job.company.slice(0, 1)}
                    </span>
                </h1>
                <div className="ms-5">
                    <h2 className="font-bold">{job.position}</h2>
                    <p>{job.company}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 mt-8 gap-y-4">
                <div className="flex gap-3">
                    <span>
                        <FaLocationArrow />
                    </span>
                    {job.jobLocation}
                </div>
                <div className="flex gap-3">
                    <span>
                        <FaCalendar />
                    </span>
                    {date}
                </div>
                <div className="flex gap-3">
                    <span>
                        <FaBriefcase />
                    </span>
                    {job.jobType}
                </div>
                <div className="bg-blue-200 w-fit px-5 py-1 text-blue-500 rounded-md">
                    {job.jobStatus}
                </div>
            </div>
            <div className="mt-8 flex gap-x-3">
                <Link
                    to={`../edit-job/${job._id}`}
                    className="bg-teal-400 text-white py-1 px-6 rounded-md"
                >
                    Edit
                </Link>
                <Form
                    className="bg-teal-400 text-white py-1 px-6 rounded-md w-fit"
                    method="post"
                    action={`../delete-job/${job._id}`}
                >
                    <button type="submit">Delete</button>
                </Form>
            </div>
        </div>
    );
};
export default JobCard;
