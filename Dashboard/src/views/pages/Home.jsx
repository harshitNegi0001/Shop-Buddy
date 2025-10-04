import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/role_management";
import { useContext } from "react";

function Home() {
    const { auth } = useContext(AuthContext);
    // if (auth === null || auth.role === null) {
    //     return <div>Loading...</div>;
    // }

    if (auth.role === "admin") {
        return <Navigate to="/admin/dashboard" replace />;
    } else if (auth.role === "seller") {
        return <Navigate to="/seller/dashboard" replace />;
    } else {
        return <Navigate to="/login" replace />;
    }
}

export default Home;