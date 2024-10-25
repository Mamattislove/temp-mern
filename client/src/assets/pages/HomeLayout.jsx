import { Outlet } from "react-router-dom";
const HomeLayout = () => {
    return (
        <div className="w-full mx-0">
            <Outlet />
        </div>
    );
};

export default HomeLayout;
