import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
    HomeLayout,
    Landing,
    Register,
    Login,
    DashboardLayout,
    Error,
    AddJob,
    AllJobs,
    Stats,
    Profile,
    Admin,
    EditJob,
} from "./assets/pages";

import { action as registerAction } from "./assets/pages/Register";
import { action as loginAction } from "./assets/pages/Login";
import { action as addJobAction } from "./assets/pages/AddJob";
import { loader as dashboardLoader } from "./assets/pages/DashboardLayout";
import { loader as allJobsLoader } from "./assets/pages/AllJobs";
import { loader as editJobLoader } from "./assets/pages/EditJob";
import { action as editJobAction } from "./assets/pages/EditJob";
import { action as deleteJobAction } from "./assets/pages/DeleteJob";
import { loader as loaderAdmin } from "./assets/pages/Admin";
import { action as profileAction } from "./assets/pages/Profile";
import { loader as statsLoader } from "./assets/pages/Stats";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />,
        errorElement: <Error />,
        children: [
            { index: true, element: <Landing /> },
            {
                path: "register",
                element: <Register />,
                action: registerAction,
            },
            { path: "login", element: <Login />, action: loginAction },
            {
                path: "dashboard",
                element: <DashboardLayout />,
                loader: dashboardLoader,
                children: [
                    { index: true, element: <AddJob />, action: addJobAction },
                    { path: "stats", element: <Stats />, loader: statsLoader },
                    {
                        path: "all-jobs",
                        element: <AllJobs />,
                        loader: allJobsLoader,
                    },
                    {
                        path: "profile",
                        element: <Profile />,
                        action: profileAction,
                    },
                    { path: "admin", element: <Admin />, loader: loaderAdmin },
                    {
                        path: "edit-job/:id",
                        element: <EditJob />,
                        loader: editJobLoader,
                        action: editJobAction,
                    },
                    {
                        path: "delete-job/:id",
                        action: deleteJobAction,
                    },
                ],
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
