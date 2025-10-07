import { lazy } from "react";
import Login from "../../pages/Login";

// const Login = lazy(() => import("../../views/auth/Login.jsx"));
// const Register = lazy(() => import("../../views/auth/Register.jsx"));
// const AdminLogin = lazy(() => import("../../views/auth/admin.jsx"));
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