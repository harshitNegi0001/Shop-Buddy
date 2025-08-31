import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();
async function getUserInfo(id, role) {
  const response = await fetch("http://localhost:5000/api/get-user", {
  method: "GET",
  credentials: "include", 
});
  const result = await response.json();
  return result.userInfo;
}
export const AuthState = (props) => {
  const navigate =useNavigate()
  const [auth, setAuth] = useState(() => {
    const savedToken = localStorage.getItem("accessToken");
    const userDetails = localStorage.getItem("userInfo")
    if (savedToken) {
      try {

        const decoded = jwtDecode(savedToken);
        return {
          token: savedToken,
          role: decoded.role,
          id: decoded.id,
          userInfo: JSON.parse(userDetails)
        };
        
      } catch (err) {
        console.error("Invalid token in localStorage:", err);
        return { token: null, role: null, id: null, userInfo: null };
      }
    }
    return { token: null, role: null, id: null, userInfo: null };
  });

  const login = async(token, role, id) => {
    const userInfo =await getUserInfo(id,role);
    setAuth({ token, role, id,userInfo  });
    localStorage.setItem("accessToken", token);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    navigate('/')
  };

  const logout = () => {
    setAuth({ token: null, role: null, id: null,userInfo:null });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userInfo");
  };
  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  )
}
