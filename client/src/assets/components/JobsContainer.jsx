import { useAllJobsContext } from "../pages/AllJobs";
import { PageBtnContainer, JobCard } from ".";

const JobsContainer = () => {
    const { jobs } = useAllJobsContext();
    // console.log(jobs);
    if (jobs.length === 0) {
        return (
            <div className="bg-white w-full h-52 mt-5 py-5">
                <h2 className="text-center text-2xl font-bold">
                    No jobs to display...
                </h2>
            </div>
        );
    }
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {jobs.map((job) => {
                    return <JobCard key={job._id} job={job} />;
                })}
            </div>

            <PageBtnContainer />
        </div>
    );
};
export default JobsContainer;
