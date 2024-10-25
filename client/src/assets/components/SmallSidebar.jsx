import links from "../../utils/link";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import { FaTimes } from "react-icons/fa";

import { useDashboardContext } from "../pages/DashboardLayout";
const SmallSidebar = () => {
    const { toggleDarkTheme, toggleSidebar, showSidebar, isDarkTheme } =
        useDashboardContext();
    return (
        <div
            className={`${
                showSidebar ? "block" : "hidden"
            } md:hidden w-full h-screen bg-slate-900 p-10 absolute top-0 left-0 z-10`}
        >
            <div
                className={`${
                    isDarkTheme
                        ? "bg-slate-600 text-white"
                        : "bg-white text-slate-400"
                }  rounded-lg p-5 relative`}
            >
                <div
                    className="absolute left-4 top-4 text-4xl text-red-700"
                    onClick={toggleSidebar}
                >
                    <FaTimes />
                </div>
                <Logo otherClassName={"mx-auto"} />
                <div className="mt-14 w-fit mx-auto">
                    <NavLinks />
                </div>
            </div>
        </div>
    );
};
export default SmallSidebar;
