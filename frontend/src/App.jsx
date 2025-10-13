import { useEffect, useState } from "react";
import toast, { ToastBar, Toaster } from 'react-hot-toast';
import loadingGif from './assets/loading3.webp';
import { useDispatch, useSelector } from 'react-redux';
import Router from "./router/Router";
import publicRoutes from './router/routes/publicRoutes'
import { getRoutes } from "./router/routes/index.jsx";
import { getInfo } from "./Store/reducer/authReducer.js";
import { socket } from "./utils/socket.js";


function App() {
  const dispatch = useDispatch();
  const { userId, userRole, isLoading } = useSelector(state => state.auth);

  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);
  useEffect(() => {
    const routes = getRoutes();
    setAllRoutes([...allRoutes, routes]);
    dispatch(getInfo());
  }, []);
  useEffect(() => {
    if (userId) {
      if (!socket.connected) {
        socket.connect();
      }

      const joinRoom = () => {
        console.log("Joining room:", `customer${userId}`);
        socket.emit("join-room", `customer${userId}`);
      };

      if (socket.connected) {
        joinRoom();
      } else {
        socket.once("connect", joinRoom);
      }

      socket.on("notify-app", (sender) => {
        if (userRole !== sender) {
          toast("You have a new message", { icon: "💬" });
        }
      });

      return () => {
        socket.off("notify-app");
        socket.off("connect", joinRoom);
      };
    }

  }, [userId])
  return (
    <div style={{ width: "100vw", height: "100vh", boxSizing: "border-box", backgroundColor: "var(--background)" }}>
      <Toaster
        toastOptions={{
          position: "top-right",
          success: {
            style: {
              backgroundColor: "var(--toast-success)"
            }
          },
          error: {
            style: {
              backgroundColor: "var(--toast-error)"
            }
          },
          style: {

            backgroundColor: 'var(--toaster)',
            color: 'var(--text)'
          }
        }}
      />
      {isLoading && <div style={{ width: "100vw", height: "100vh", position: "fixed", zIndex: "9999", backdropFilter: "blur(5px)", display: "flex", justifyContent: "center", alignItems: "center" }}><img src={loadingGif} style={{ width: "45px" }} alt="" /></div>}
      <Router allRoutes={allRoutes} />
    </div>
  )
}

export default App
