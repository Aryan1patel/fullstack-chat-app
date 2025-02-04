import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingPage from "./pages/SettingPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./store/useAuthStore.js";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore.js";

function App() {

  const {authUser,checkAuth,isCheckingAuth, onlineUsers} = useAuthStore();
  const {theme} = useThemeStore();

  console.log("onlineUsers: ",onlineUsers)

  useEffect(()=>{  // this will run only once when the app is loaded
    checkAuth();
  },[checkAuth])

  console.log("authUser: ",authUser)
  
  if(isCheckingAuth && !authUser) return(
    <div className="flex items-center justify-center h-screen">
    <span className="loading loading-ball loading-xl"></span>
    </div>
  )

  return (
    <div data-theme={theme}>

       
      
      <Navbar/>
<div className="h-16"></div>
      <Routes>

        <Route path="/" element={authUser ? <HomePage /> : <Navigate to ="/login" />  } />  // if user is authenticated then HomePage will be shown otherwise user will be redirected to login page
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> :<Navigate to = "/" /> } />  // if user is authenticated then user will be redirected to home page
        <Route path="/settings" element={ <SettingPage /> } />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to ="/login" />  } />
        
      </Routes>

      <Toaster />

    </div>
  );
}

export default App;
