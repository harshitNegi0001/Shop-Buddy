import { Suspense } from "react";
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";

function ProtectedRoute({ route, children }) {
    const { userId, userInfo,isLoading } = useSelector(state => state.auth);
    if(isLoading){
       return <div>
            loading...
        </div>
    }
    if (userInfo) {
        return <Suspense fallback={null}>{children}</Suspense>
    }
    else {
        if (route.status) {
            return <Navigate to={'/login'} replace />
        }
        else {
            return <Suspense fallback={null}>{children}</Suspense>
        }
    }
}
export default ProtectedRoute;