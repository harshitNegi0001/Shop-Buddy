import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import Home from "./pages/Home";




function App() {

  return (
    <div style={{ width: "100vw", height: "100vh", boxSizing: "border-box", backgroundColor: "var(--background)" }}>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App
