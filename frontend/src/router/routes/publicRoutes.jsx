import { lazy } from "react";

const Login = lazy(() => import("../../pages/Login.jsx"));
const Register = lazy(() => import("../../pages/Register.jsx"));

const publicRoutes = [
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    }
    
]
export default publicRoutes;