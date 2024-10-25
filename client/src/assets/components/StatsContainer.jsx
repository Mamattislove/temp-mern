import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import StatItem from "./StatItem";

const StatsContainer = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatItem
                icon={<FaSuitcaseRolling />}
                title={"Pending Applications"}
                count={stats.pending}
                colorClassName={"text-orange-300"}
                bgColorClassName={"bg-orange-100"}
                borderColorClassName={"border-b-orange-300"}
            />
            <StatItem
                icon={<FaCalendarCheck />}
                title={"Interview Applications"}
                count={stats.interview}
                colorClassName={"text-sky-300"}
                bgColorClassName={"bg-sky-100"}
                borderColorClassName={"border-b-sky-300"}
            />
            <StatItem
                icon={<FaCalendarCheck />}
                title={"Declined Applications"}
                count={stats.declined}
                colorClassName={"text-red-300"}
                bgColorClassName={"bg-red-100"}
                borderColorClassName={"border-b-red-300"}
            />
        </div>
    );
};
export default StatsContainer;
