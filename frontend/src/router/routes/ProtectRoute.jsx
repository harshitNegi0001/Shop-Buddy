// import { Suspense, useContext } from "react";
// import { AuthContext } from "../../context/role_management";
// import { Navigate } from "react-router-dom";

// function ProtectedRoute({ route, children }) {
//     const { auth } = useContext(AuthContext);
//     const { role, userInfo } = auth;
//     if (role) {


//         if ((Array.isArray(route.role) && route.role.includes(role)) || role === route.role) {
//             if (route.status && userInfo.s_status === route.status) {
                
//                 return <Suspense fallback={null}>{children}</Suspense>
//             }

//             else {
                
//                     if (userInfo.s_status === route.status  ||(Array.isArray(route.visibility) && route.visibility.includes(userInfo.s_status))) {
                        
//                         return <Suspense fallback={null}>{children}</Suspense>
//                     }
//                     else if (userInfo.s_status === 'pending') {
//                         return <Navigate to={'/seller/account-pending'} replace />
//                     }
//                     else if(userInfo.s_status === 'deactive'){
//                         return <Navigate to={'/seller/account-deactive'} replace />
//                     }

//                 else {
                    
//                     return <Suspense fallback={null}>{children}</Suspense>
//                 }
//             }
//             // if(userInfo.s_role==='seller'){
//             //     console.log(userInfo.s_role," ke andr")
//             //     if(userInfo.s_status === route.status  ||(Array.isArray(route.visibility) && route.visibility.includes(userInfo.s_status))){
//             //         console.log(userInfo.s_status," ke andr")
//             //         return <Suspense fallback={null}>{children}</Suspense>

//             //     }
//             //     // else{
//             //     //     if(userInfo.s_status==='pending'){
//             //     //         return <Navigate to={'/seller/account-pending'} replace />
//             //     //     }
//             //     //     else{
//             //     //         return <Navigate to={'/seller/account-deactive'} replace />
//             //     //     }
//             //     // }
//             // }


//             // else if(userInfo.role==='admin'){
//             //     return <Suspense fallback={null}>{children}</Suspense>
//             // } 


//         }
//         else {
//             return <Navigate to={'/unauthorized'} replace />
//         }
//     }
//     else {
//         return <Navigate to={'/login'} replace />
//     }
// }
// export default ProtectedRoute;