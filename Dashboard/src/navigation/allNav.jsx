import {AiOutlineDashboard, AiOutlineShopping} from 'react-icons/ai'
import {BiCategory} from 'react-icons/bi';
import {FaUsers,FaUserTimes} from 'react-icons/fa';
import {FaCodePullRequest} from 'react-icons/fa6'
import {MdPayment} from 'react-icons/md'
import {IoIosChatbubbles} from 'react-icons/io';
import { FaCartPlus } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { RiDiscountPercentFill } from "react-icons/ri";
import { ImBubbles,ImBubbles2  } from "react-icons/im";
import { IoPersonSharp } from "react-icons/io5";

export const allNav = [
    {
        id : 1,
        title : "Dashboard",
        icon: <AiOutlineDashboard/>,
        role:'admin',
        path:'/admin/dashboard'
    },
    {
        id : 2,
        title : "Orders",
        icon: <AiOutlineShopping/>,
        role:'admin',
        path:'/admin/dashboard/orders'
    },
    {
        id : 3,
        title : "Category",
        icon: <BiCategory/>,
        role:'admin',
        path:'/admin/dashboard/category'
    },
    {
        id : 4,
        title : "Sellers",
        icon: <FaUsers/>,
        role:'admin',
        path:'/admin/dashboard/sellers'
    },
    {
        id : 5,
        title : "Payment Request",
        icon: <MdPayment/>,
        role:'admin',
        path:'/admin/dashboard/payment-request'
    },
    {
        id : 6,
        title : "Deactive Sellers",
        icon: <FaUserTimes/>,
        role:'admin',
        path:'/admin/dashboard/deactive-sellers'
    },
    {
        id : 7,
        title : "Seller Requests",
        icon: <FaCodePullRequest/>,
        role:'admin',
        path:'/admin/dashboard/seller-request'
    },
    {
        id : 8,
        title : "Live Chat",
        icon: <IoIosChatbubbles/>,
        role:'admin',
        path:'/admin/dashboard/live-chat'
    },
    {
        id : 9,
        title : "Dashboard",
        icon: <AiOutlineDashboard/>,
        role:'seller',
        path:'/seller/dashboard'
    },
    {
        id : 10,
        title : "Add Product",
        icon: <FaCartPlus />,
        role:'seller',
        path:'/seller/dashboard/add-product'
    },
    {
        id : 11,
        title : "All Product",
        icon: <TiShoppingCart />,
        role:'seller',
        path:'/seller/dashboard/all-product'
    },
    {
        id : 12,
        title : "Discount Product",
        icon: <RiDiscountPercentFill  />,
        role:'seller',
        path:'/seller/dashboard/discount-product'
    },
    {
        id : 13,
        title : "Orders",
        icon: <AiOutlineShopping/>,
        role:'seller',
        path:'/seller/dashboard/orders'
    },
    {
        id : 14,
        title : "Payment",
        icon: <MdPayment/>,
        role:'seller',
        path:'/seller/dashboard/payment'
    },
    {
        id : 15,
        title : "Chat Customer",
        icon: <ImBubbles />,
        role:'seller',
        path:'/seller/dashboard/chat-customer'
    },
    {
        id : 16,
        title : "Chat Support",
        icon: <ImBubbles2 />,
        role:'seller',
        path:'/seller/dashboard/chat-support'
    },
    {
        id : 17,
        title : "Profile",
        icon: <IoPersonSharp />,
        role:'seller',
        path:'/seller/dashboard/profile'
    }
]