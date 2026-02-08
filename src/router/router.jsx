import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../Pages/HomeRelated/HomePage/HomePage";
import AllContexts from "../Pages/AllContests/AllContexts";
import Services from "../Pages/Services/Services";
import AboutUs from "../Pages/AboutUs/AboutUs";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../Pages/AuthRelated/Register/Register";
import Login from "../Pages/AuthRelated/Login/Login";


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
    }

])