import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useState } from "react";
import { useDashboardContext } from "../pages/DashboardLayout";

const LogoutContainer = () => {
    const [showLogout, setShowLogout] = useState(false);
    const { user, logoutUser } = useDashboardContext();

    const toggleLogout = () => {
        setShowLogout(!showLogout);
    };

    return (
        <div className="bg-teal-500 text-white text-lg relative rounded-md">
            <div
                className="flex hover:bg-teal-600 justify-between w-full px-4 py-1 hover: rounded-md"
                onClick={toggleLogout}
            >
                {user.avatar ? (
                    <img
                        src={user.avatar}
                        alt="avatar"
                        className="w-5 h-5 rounded-full"
                    />
                ) : (
                    <span className="h-fit ">
                        <FaUserCircle />
                    </span>
                )}

                <span className="ms-3 h-fit text-sm">{user.name}</span>
                <span className="ms-3 h-fit ">
                    <FaCaretDown />
                </span>
            </div>

            <button
                className={`bg-teal-500 text-white text-sm px-3 pb-1 rounded-md mt-2 w-full absolute top-full left-0 ${
                    showLogout ? null : "hidden"
                }`}
                onClick={logoutUser}
            >
                Logout
            </button>
        </div>
    );
};
export default LogoutContainer;
