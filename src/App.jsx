import React, { useEffect } from "react";

import Header from "./components/Header";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TaskList from "./components/TaskList";
import AdminDashBoard from "./components/adminDashboard";
import AOS from "aos"
import "aos/dist/aos.css";


const App = () => {
  useEffect(()=>{
    AOS.init({
      duration:1000,
      once:true
    })
  },[])
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path = '/admin' element={<AdminDashBoard/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/alltask" element = {<TaskList/>}/>
      </Routes>
<ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="light"
/>

    </div>
  );
};

export default App;
