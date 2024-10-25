import { toast } from "react-toastify";
import { ChartsContainer, StatsContainer } from "../components";
import { useLoaderData } from "react-router-dom";
import customFetch from "../../utils/customFetch";

export const loader = async () => {
    try {
        const { data } = await customFetch.get("/jobs/stats");
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
    }
};

const Stats = () => {
    const data = useLoaderData();
    console.log(data);
    return (
        <div className="w-11/12 mt-8 mx-auto h-auto">
            <StatsContainer stats={data.stats} />
            <ChartsContainer data={data.monthlyApplications} />
        </div>
    );
};
export default Stats;
