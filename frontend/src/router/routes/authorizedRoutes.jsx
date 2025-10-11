import { lazy } from "react";


const Home = lazy(() => import("../../views/Home.jsx"));
const Products = lazy(() => import("../../views/Products.jsx"));
const SellerChat = lazy(() => import("../../views/SellerChat.jsx"));
const OrdersDetail = lazy(() => import("../../views/OrdersDetail.jsx"));


export const authorizedRoutes=[
    {
        path:'/',
        element:<Home/>,
        
    },
    {
        path:'/products',
        element:<Products/>,
        
    },
    {
        path:'/orders-hist',
        element:<OrdersDetail/>,
        status:'authorized'
    },
    {
        path:'/seller-chat',
        element:<SellerChat/>,
        status:'authorized'
    },
    {
        path:'/seller-chat/:sellerId',
        element:<SellerChat/>,
        status:'authorized'
    }
]