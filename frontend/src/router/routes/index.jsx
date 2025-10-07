import { authorizedRoutes } from "./authorizedRoutes.jsx";
import MainLayout from "../../pages/MainLayout.jsx";
// import ProtectedRoute from "./ProtectRoute";

export const getRoutes = () =>{
    // privateRoutes.map(r=>
    // {
    //     r.element=<ProtectedRoute route={r}>{r.element}</ProtectedRoute>
    // }
    // )
    return{
        path:'/',
        element:<MainLayout/>,
        children:authorizedRoutes

    }
}