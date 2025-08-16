import { lazy } from "react";

const Orders = lazy(()=>import("../../views/admin/Orders.jsx"));
const AdminDashboard = lazy(()=>import("../../views/admin/AdminDashboard.jsx"));
const Category = lazy(()=>import("../../views/admin/Category.jsx"));
const Sellers = lazy(()=>import("../../views/admin/Sellers.jsx"));
const PaymentRequests = lazy(()=>import("../../views/admin/PaymentRequests.jsx"));
const DeactiveSellers = lazy(()=>import("../../views/admin/DeactiveSellers.jsx"));
const SellerRequest = lazy(()=>import("../../views/admin/SellerRequest.jsx"));
const LiveChat = lazy(()=>import("../../views/admin/LiveChat.jsx"));
const SellerDetails = lazy(()=>import("../../views/admin/SellerDetails.jsx"));
const OrderDetails = lazy(()=>import("../../views/admin/orderDetails.jsx"));

export const adminRoutes = [
    // {
    //     path:'/',
    //     element:<AdminDashboard/>,
    //     ability:'admin'
    // },
    {
        path:'admin/dashboard',
        element:<AdminDashboard/>,
        ability:'admin'
    },
    {
        path:'admin/dashboard/orders',
        element:<Orders/>,
        ability:'admin'
    },
    {
        path:'admin/dashboard/category',
        element:<Category/>,
        ability:'admin'
    },
    {
        path:'admin/dashboard/sellers',
        element:<Sellers/>,
        ability:'admin'
    },
    {
        path:'admin/dashboard/payment-request',
        element:<PaymentRequests/>,
        ability:'admin'
    },
    {
        path:'admin/dashboard/deactive-sellers',
        element:<DeactiveSellers/>,
        ability:'admin'
    },
    {
        path:'admin/dashboard/seller-request',
        element:<SellerRequest/>,
        ability:'admin'
    },
    {
        path:'admin/dashboard/live-chat',
        element:<LiveChat/>,
        ability:'admin'
    },
    {
        path:'admin/dashboard/live-chat/:sellerId',
        element:<LiveChat/>,
        ability:'admin'
    },
    {
        path:'admin/dashboard/seller/details/:sellerId',
        element:<SellerDetails/>,
        ability:'admin'
    },
    {
        path:'admin/dashboard/orders/details/:orderId',
        element:<OrderDetails/>,
        ability:'admin'
    }
]