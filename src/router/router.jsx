import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../Pages/HomeRelated/HomePage/HomePage";
import AllContexts from "../Pages/AllContests/AllContexts";
import Services from "../Pages/Services/Services";
import AboutUs from "../Pages/AboutUs/AboutUs";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../Pages/AuthRelated/Register/Register";
import Login from "../Pages/AuthRelated/Login/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../Pages/DashboardRelated/DashboardHome/DashboardHome";
import MyParticipitedContests from "../Pages/DashboardRelated/UserRelated/MyParticipatedContests/MyParticipitedContests";
import MyWinngContests from "../Pages/DashboardRelated/UserRelated/MyWinningContests/MyWinngContests";
import AddContestPage from "../Pages/DashboardRelated/CreatorRelated/AddContestPage/AddContestPage";
import MyCreatedContests from "../Pages/DashboardRelated/CreatorRelated/MyCreatedContests/MyCreatedContests";
import SubmittedTasksPage from "../Pages/DashboardRelated/CreatorRelated/SubmittedTasksPage/SubmittedTasksPage";
import ContestSubmissions from "../Pages/DashboardRelated/CreatorRelated/ContestSubmissions/ContestSubmissions";
import ManageUsers from "../Pages/DashboardRelated/AdminRelated/ManageUsers/ManageUsers";
import ManageContests from "../Pages/DashboardRelated/AdminRelated/ManageContests/ManageContests";


export const router = createBrowserRouter([

    {
        path: "/",
        Component: RootLayout,
        children: [

            {
                index: true,
                Component: HomePage

            },

            {
                path: "all-contests",
                Component: AllContexts
            },

            {
                path: "services",
                Component: Services
            },

            {
                path: "about-us",
                Component: AboutUs
            }
        ]
    },

    {
        path: "/",
        Component: AuthLayout,
        children: [

            {
                path: "register",
                Component: Register
            },

            {
                path: "login",
                Component: Login
            }
        ]
    },

    {
        path: "dashboard",
        Component: DashboardLayout,
        children: [

            {
                index: true,
                Component: DashboardHome
            },

            {
                path: "my-participated-contests",
                element: <MyParticipitedContests></MyParticipitedContests>
            },

            {
                path: "my-winning-contests",
                element: <MyWinngContests></MyWinngContests>
            },

            // Admin related 

            {
                path: "admin-manage-users",
                element: <ManageUsers></ManageUsers>

            },

            {
                path: "admin-manage-contests",
                element: <ManageContests></ManageContests>
            },

            // Creator related

            {
                path: "add-contest",
                element: <AddContestPage></AddContestPage>
            },

            {
                path: "my-created-contests",
                element: <MyCreatedContests></MyCreatedContests>
            },

            {
                path: "submitted-tasks",
                element: <SubmittedTasksPage></SubmittedTasksPage>
            },

            {
                path: "submissions/:contestId",
                element: <ContestSubmissions></ContestSubmissions>
            }
            
        ]

    }

])