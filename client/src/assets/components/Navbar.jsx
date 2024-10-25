import { FaHome, FaAlignLeft } from "react-icons/fa";
import Logo from "./Logo";
import { useDashboardContext } from "../pages/DashboardLayout";
import LogoutContainer from "./LogoutContainer";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
    const { toggleDarkTheme, toggleSidebar, isDarkTheme } =
        useDashboardContext();
    return (
        <div
            className={`w-full flex justify-between items-end text-3xl border-b-2 pb-8 px-1 md:px-10 pt-5 ${
                isDarkTheme ? "bg-slate-600 text-white border-b-0" : "bg-white"
            }`}
        >
            <button className="text-teal-400" onClick={toggleSidebar}>
                <FaAlignLeft />
            </button>
            <div>
                <Logo otherClassName="h-8 inline-block md:hidden" />
                <h4 className=" hidden md:inline-block">Dashboard</h4>
            </div>
            <div className="flex">
                <ThemeToggle otherClassName="mr-5 text-sm" />
                <LogoutContainer />
            </div>
        </div>
    );
};
export default Navbar;
