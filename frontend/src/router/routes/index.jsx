import { privateRoutes } from "./privateRoutes";
import MainLayout from "../../layouts/MainLayout";
import { relativeTimeThreshold } from "moment/moment";

export const getRoutes = () =>{
    return{
        path:'/',
        element:<MainLayout/>,
        children:privateRoutes

    }
}