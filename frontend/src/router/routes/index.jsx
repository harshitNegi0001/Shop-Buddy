import { privateRoutes } from "./privateRoutes";
import MainLayout from "../../layouts/MainLayout";
import ProtectedRoute from "./ProtectRoute";

export const getRoutes = () =>{
    privateRoutes.map(r=>
    {
        r.element=<ProtectedRoute route={r}>{r.element}</ProtectedRoute>
    }
    )
    return{
        path:'/',
        element:<MainLayout/>,
        children:privateRoutes

    }
}