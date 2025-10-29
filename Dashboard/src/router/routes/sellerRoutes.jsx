import { lazy } from "react";
const Home = lazy(()=>import("../../views/pages/Home.jsx"));
const SellerDashboard = lazy(()=>import("../../views/seller/SellerDashboard.jsx"));
const AddProduct = lazy(()=>import("../../views/seller/AddProduct.jsx"));
const AllProducts = lazy(()=>import("../../views/seller/AllProducts.jsx"));
const DiscountProduct = lazy(()=>import("../../views/seller/DiscountProduct.jsx"));
const Orders = lazy(()=>import("../../views/seller/Orders.jsx"));
const Payment = lazy(()=>import("../../views/seller/Payment.jsx"));
const SellerToCustomer = lazy(()=>import("../../views/seller/sellerToCustomer.jsx"));
const SellerToAdmin = lazy(()=>import("../../views/seller/SellerToAdmin.jsx"));
const SellerProfile = lazy(()=>import("../../views/seller/SellerProfile.jsx"));
const EditProduct = lazy(()=>import("../../views/seller/EditProducts.jsx"));
const OrderDetails = lazy(()=>import("../../views/seller/OrderDetails.jsx"));
const Pending = lazy(()=>import("../../views/Pending.jsx"));
const Deactive = lazy(()=>import("../../views/Deactive.jsx"));


export const sellerRoutes = [
    {
        path:'/',
        element:<Home/>,
        role:['admin','seller']
    },
    {
        path:'/seller/dashboard',
        element:<SellerDashboard/>,
        role:'seller',
        status:'active'
    },
    {
        path:'/seller/dashboard/add-product',
        element:<AddProduct/>,
        role:'seller',
        status:'active'
    },
    {
        path:'/seller/dashboard/all-product',
        element:<AllProducts/>,
        role:'seller',
        status:'active'
    },
    {
        path:'/seller/dashboard/discount-product',
        element:<DiscountProduct/>,
        role:'seller',
        status:'active'
    },
    {
        path:'/seller/dashboard/orders',
        element:<Orders/>,
        role:'seller',
        visibility:['active','deactive']
    },
    {
        path:'/seller/dashboard/order/detail/:orderId',
        element:<OrderDetails/>,
        role:'seller',
        visibility:['active','deactive']
    },
    {
        path:'/seller/dashboard/payment',
        element:<Payment/>,
        role:'seller',
        status:'active'
    },
    {
        path:'/seller/dashboard/chat-customer',
        element:<SellerToCustomer/>,
        role:'seller',
        status:'active'
    },
    {
        path:'/seller/dashboard/chat-customer/:customerId',
        element:<SellerToCustomer/>,
        role:'seller',
        status:'active'
    },
    {
        path:'/seller/dashboard/chat-support',
        element:<SellerToAdmin/>,
        role:'seller',
        visibility:['active','deactive','pending']
    },
    {
        path:'/seller/dashboard/profile',
        element:<SellerProfile/>,
        role:'seller',
        status:'active'
    },
    {
        path:'/seller/dashboard/edit-product/:productId',
        element:<EditProduct/>,
        role:'seller',
        status:'active'
    }
    ,
    {
        path:'/seller/account-pending',
        element:<Pending/>,
        role:'seller',
        status:'pending'
    },
    {
        path:'/seller/account-deactive',
        element:<Deactive/>,
        role:'seller',
        status:'deactive'
        
    }
]