import links from "../../utils/link";
import { Link } from "react-router-dom";

import { useDashboardContext } from "../pages/DashboardLayout";

const NavLinks = ({ otherClassName, isBigSideBar }) => {
    const { toggleSidebar, user } = useDashboardContext();

    return (
        <div className={otherClassName}>
            {links.map((link) => {
                const { text, path, icon } = link;
                const role = user.role;
                if (role !== "admin" && path === "admin") {
                    return;
                }
                return (
                    <div key={text}>
                        <div className="text-left my-5  hover:translate-x-3 hover:text-teal-400">
                            <Link
                                to={path}
                                onClick={isBigSideBar ? null : toggleSidebar}
                            >
                                <span className="inline-block text-3xl">
                                    {icon}
                                </span>
                                <span className="ms-5">{text}</span>
                            </Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
export default NavLinks;
