import { lazy } from "react";

const Login = lazy(() => import("../../pages/Login"));
// const Register = lazy(() => import("../../views/auth/Register.jsx"));
// const Unauthorized = lazy(() => import("../../views/Unauthorized.jsx"));

const publicRoutes = [
    {
        path: '/login',
        element: <Login />
    },
    // {
    //     path: '/register',
    //     element: <Register />
    // },
    // {
    //     path: '/admin-login',
    //     element: <AdminLogin />
    // },
    // {
    //     path: '/unauthorized',
    //     element: <Unauthorized />
    // }
]
export default publicRoutes;