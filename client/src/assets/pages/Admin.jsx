import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";
import { StatItem } from "../components";
import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";

export const loader = async () => {
    try {
        const { data } = await customFetch("/users/admin/app-stats");
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return redirect("../all-jobs");
    }
};

const Admin = () => {
    const data = useLoaderData();
    console.log(data);

    return (
        <div className="p-8 h-screen">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatItem
                    icon={<FaSuitcaseRolling />}
                    count={data.jobs}
                    colorClassName={"text-orange-400"}
                    borderColorClassName={"border-b-orange-300"}
                    bgColorClassName={"bg-orange-100"}
                    title={"Jobs Count"}
                />
                <StatItem
                    icon={<FaCalendarCheck />}
                    count={data.users}
                    colorClassName={"text-cyan-400"}
                    borderColorClassName={"border-b-cyan-300"}
                    bgColorClassName={"bg-cyan-100"}
                    title={"Users Count"}
                />
            </div>
        </div>
    );
};
export default Admin;
