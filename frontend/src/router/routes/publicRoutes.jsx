import { lazy } from "react";

const Login = lazy(()=>import("../../views/auth/Login.jsx"));
const Register= lazy(()=>import("../../views/auth/Register.jsx")) ;
const AdminLogin= lazy(()=>import("../../views/auth/admin.jsx"))

const publicRoutes = [
    {
        path:'/login',
        element: <Login />
    },
    {
        path:'/register',
        element: <Register/>
    },
    {
        path:'/admin-login',
        element: <AdminLogin/>
    }
]
export default publicRoutes;