import { lazy } from "react";
const Home = lazy(()=>import("../../views/pages/Home.jsx"));
const Orders = lazy(()=>import("../../views/admin/Orders.jsx"));
const AdminDashboard = lazy(()=>import("../../views/admin/AdminDashboard.jsx"));
const Category = lazy(()=>import("../../views/admin/Category.jsx"));
const Sellers = lazy(()=>import("../../views/admin/Sellers.jsx"));
const PaymentRequests = lazy(()=>import("../../views/admin/PaymentRequests.jsx"));
const DeactiveSellers = lazy(()=>import("../../views/admin/DeactiveSellers.jsx"));
const SellerRequest = lazy(()=>import("../../views/admin/SellerRequest.jsx"));
const LiveChat = lazy(()=>import("../../views/admin/LiveChat.jsx"));
const SellerDetails = lazy(()=>import("../../views/admin/SellerDetails.jsx"));
const OrderDetails = lazy(()=>import("../../views/admin/OrderDetails.jsx"));


export const adminRoutes = [
    
    {
        path:'admin/dashboard',
        element:<AdminDashboard/>,
        role:'admin'
    },
    {
        path:'admin/dashboard/orders',
        element:<Orders/>,
        role:'admin'
    },
    {
        path:'admin/dashboard/category',
        element:<Category/>,
        role:'admin'
    },
    {
        path:'admin/dashboard/sellers',
        element:<Sellers/>,
        role:'admin'
    },
    {
        path:'admin/dashboard/payment-request',
        element:<PaymentRequests/>,
        role:'admin'
    },
    {
        path:'admin/dashboard/deactive-sellers',
        element:<DeactiveSellers/>,
        role:'admin'
    },
    {
        path:'admin/dashboard/seller-request',
        element:<SellerRequest/>,
        role:'admin'
    },
    {
        path:'admin/dashboard/live-chat',
        element:<LiveChat/>,
        role:'admin'
    },
    {
        path:'admin/dashboard/live-chat/:sellerId',
        element:<LiveChat/>,
        role:'admin'
    },
    {
        path:'admin/dashboard/seller/details/:sellerId',
        element:<SellerDetails/>,
        role:'admin'
    },
    {
        path:'admin/dashboard/orders/details/:orderId',
        element:<OrderDetails/>,
        role:'admin'
    }
]