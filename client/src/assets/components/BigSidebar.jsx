import { useDashboardContext } from "../pages/DashboardLayout";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

const BigSidebar = () => {
    const { showSidebar, isDarkTheme } = useDashboardContext();
    return (
        <div
            className={`hidden text-center md:min-w-80 transition-transform delay-1000 duration-1000 ease-in-out ${
                showSidebar ? "md:block " : "md:-translate-x-full"
            } ${
                isDarkTheme
                    ? "bg-slate-600 text-white"
                    : "bg-white text-slate-400"
            }`}
        >
            <Logo otherClassName={"mx-auto my-5"} />
            <div
                className={`${
                    isDarkTheme ? "border-e-0" : "border-e-2 "
                } h-svh`}
            >
                <div className="w-fit mx-auto">
                    <NavLinks otherClassName={"py-10"} isBigSideBar={true} />
                </div>
            </div>
        </div>
    );
};
export default BigSidebar;
