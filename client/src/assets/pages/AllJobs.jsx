import customFetch from "../../utils/customFetch";
import { JobsContainer, SearchContainer } from "../components";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";

export const loader = async ({ request }) => {
    try {
        const params = Object.fromEntries([
            ...new URL(request.url).searchParams.entries(),
        ]);
        // console.log(params);

        const { data } = await customFetch.get("/jobs/", { params });
        console.log(data);

        return {
            jobs: data.jobs,
            searchValues: { ...params },
            numOfPage: data.numOfPage,
            currentPage: data.page,
        };
    } catch (error) {
        return error;
    }
};

const AllJobsContext = createContext();
const AllJobs = () => {
    const { jobs, searchValues, numOfPage, currentPage } = useLoaderData();

    return (
        <AllJobsContext.Provider
            value={{ jobs, searchValues, numOfPage, currentPage }}
        >
            <div className="w-full p-5">
                <SearchContainer />
                <JobsContainer />
            </div>
        </AllJobsContext.Provider>
    );
};

export const useAllJobsContext = () => useContext(AllJobsContext);
export default AllJobs;
