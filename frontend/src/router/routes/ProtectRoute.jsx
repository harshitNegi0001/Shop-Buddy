import { Suspense } from "react";
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import loadingGif from '../../assets/loading3.webp';

function ProtectedRoute({ route, children }) {
    const { userId, userInfo,isLoading } = useSelector(state => state.auth);
    if(isLoading){
       return <div className="loading-div"><img src={loadingGif} /></div>
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