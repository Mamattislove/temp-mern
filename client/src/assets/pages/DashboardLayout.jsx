import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { Navbar, SmallSidebar, BigSidebar } from "../components";
import { createContext, useContext, useState } from "react";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";

const DashboardContext = createContext();

export const loader = async () => {
    try {
        const data = await customFetch.get("/users/current-user");
        return data.data;
    } catch (error) {
        console.log(error);
        return redirect("/");
    }
};

const DashboardLayout = () => {
    const { user } = useLoaderData();
    const navigate = useNavigate();
    const [showSidebar, setShowSidebar] = useState(true);
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const toggleDarkTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const logoutUser = async () => {
        // console.log("user logged out");
        navigate("/");
        await customFetch.get("/auth/logout");
        toast.success("Logout user");
    };
    return (
        <DashboardContext.Provider
            value={{
                user,
                showSidebar,
                isDarkTheme,
                toggleDarkTheme,
                toggleSidebar,
                logoutUser,
            }}
        >
            <div
                className={`relative h-auto ${
                    isDarkTheme ? "bg-slate-700 text-white" : "bg-slate-100"
                }`}
            >
                <main
                    className={`mx-0 w-screen grid grid-cols-1 ${
                        showSidebar
                            ? "md:grid-cols-[auto_1fr]"
                            : "md:grid-cols-[auto]"
                    } `}
                >
                    <SmallSidebar />

                    <BigSidebar />
                    <div>
                        <Navbar />
                        <div className="text-left">
                            <Outlet context={{ user }} />
                        </div>
                    </div>
                </main>
            </div>
        </DashboardContext.Provider>
    );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
