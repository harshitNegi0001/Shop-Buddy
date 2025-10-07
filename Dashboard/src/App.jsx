import { useEffect, useState } from "react";
import Router from "./router/Router";
import publicRoutes from './router/routes/publicRoutes'
import { getRoutes } from "./router/routes/index.jsx";
import { AuthState } from "./context/role_management.jsx";

function App() {
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);
  useEffect(() => {
    const routes = getRoutes();
    setAllRoutes([...allRoutes, routes]);
  }, [])
  return(
  <AuthState>
    <Router allRoutes={allRoutes} />
  </AuthState>)

}


export default App;