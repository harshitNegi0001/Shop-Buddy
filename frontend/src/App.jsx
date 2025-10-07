import { useEffect, useState } from "react";
import Router from "./router/Router";
import publicRoutes from './router/routes/publicRoutes'
import { getRoutes } from "./router/routes/index.jsx";



function App() {
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);
  useEffect(() => {
    const routes = getRoutes();
    setAllRoutes([...allRoutes, routes]);
  }, [])
  return (
    <div style={{ width: "100vw", height: "100vh", boxSizing: "border-box", backgroundColor: "var(--background)" }}>
      <Router allRoutes={allRoutes} />
    </div>
  )
}

export default App
