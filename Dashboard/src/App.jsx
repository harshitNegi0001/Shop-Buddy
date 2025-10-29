import { useContext, useEffect, useState } from "react";
import Router from "./router/Router";
import publicRoutes from './router/routes/publicRoutes'
import { getRoutes } from "./router/routes/index.jsx";
import { AuthContext } from "./context/role_management.jsx";
import { socket } from "./utils/socket.js";
import toast from "react-hot-toast";

function App() {
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);
  const {auth} = useContext(AuthContext);
  const {id,role} = auth;
  useEffect(() => {
    const routes = getRoutes();
    setAllRoutes([...allRoutes, routes]);
  }, [])
  useEffect(()=>{
    if (id&&role) {
      if (!socket.connected) {
        socket.connect();
      }

      const joinRoom = () => {
        socket.emit("join-room", `${role}${id}`);
      };

      if (socket.connected) {
        joinRoom();
      } else {
        socket.once("connect", joinRoom);
      }

      socket.on("notify-app", (sender) => {
      
        if (role !== sender) {
          toast("You have a new message", { icon: "💬" });
        }
      });

      return () => {
        socket.off("notify-app");
        socket.off("connect", joinRoom);
      };
    }
  },[id,role]);
  return(
  
    <Router allRoutes={allRoutes} />
  )

}


export default App;