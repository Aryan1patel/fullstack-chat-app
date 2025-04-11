import { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingPage from "./pages/SettingPage";
import ProfilePage from "./pages/ProfilePage";
import DisplayPage from "./pages/DisplayPage";
import DexterChatbot from "./components/DexterChatbot.jsx";
import Harlyqueen from "./components/Harlyqueen.jsx"
import Tyler from "./components/Tyler.jsx";

import GalleryShowcase from "./pages/GalleryShowcase";
import GalleryShowcase2 from "./pages/GalleryShowcase2.jsx";

import { useAuthStore } from "./store/useAuthStore.js";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore.js";
import { MusicProvider } from "./components/MusicContext.jsx";

import Imagedis from "./components/imageDis.jsx";


function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  console.log("onlineUsers: ", onlineUsers);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log("authUser: ", authUser);

  if (isCheckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen">
      <span className="loading loading-ball loading-xl"></span>
    </div>
  );

  return (
    <MusicProvider> {/* Wrap everything inside MusicProvider */}
      <div data-theme={theme}>
        <Navbar />
        <Routes>
          <Route path="/" element={authUser ? <DisplayPage /> : <Navigate to="/login" />} />
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/settings" element={<SettingPage />} />
          <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
          <Route path="/chat" element={authUser ? <HomePage /> : <Navigate to="/login" />} />

          <Route path="/dexter" element={authUser ? <DexterChatbot /> : <Navigate to="/login" />} />
          <Route path="/quinn" element={authUser ? <Harlyqueen /> : <Navigate to="/login" />} />
          <Route path="/tyler" element={authUser ? <Tyler /> : <Navigate to="/login" />} />

          <Route path="/image1" element={authUser ? <Imagedis /> : <Navigate to="/login" />} />

          <Route path="/gallery" element={authUser ? <GalleryShowcase /> : <Navigate to="/login" />} />
          <Route path="/gallery2" element={authUser ? <GalleryShowcase2 /> : <Navigate to="/login" />} />

          

        </Routes>
        <Toaster />
      </div>
    </MusicProvider>
  );
}

export default App;
