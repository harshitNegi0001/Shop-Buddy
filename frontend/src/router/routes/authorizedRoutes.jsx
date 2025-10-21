import { lazy } from "react";

const Home = lazy(() => import("../../views/Home.jsx"));
const Products = lazy(() => import("../../views/Products.jsx"));
const SellerChat = lazy(() => import("../../views/SellerChat.jsx"));
const OrdersDetail = lazy(() => import("../../views/OrdersDetail.jsx"));
const ProductDetail = lazy(() => import("../../views/ProductDetail.jsx"));
const MyCart = lazy(() => import("../../views/MyCart.jsx"));


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
    },
    {
        path:'/product-detail/:prodId',
        element:<ProductDetail/>
    },
    {
        path:'/myCart',
        element:<MyCart/>,
        status:'authorized'
    }
]