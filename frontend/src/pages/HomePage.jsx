import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore';
import Sidebar from '../components/Sidebar';
import NoChatSelected from '../components/NoChatSelected';
import ChatContainer from '../components/ChatContainer';

const HomePage = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { selectedUser } = useChatStore();

  return (
    <div className="min-h-screen bg-base-200">
      <div className="flex items-center justify-center p-2 sm:p-4 md:pt-20">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl min-h-[500px] h-[calc(100vh-1rem)] sm:h-[calc(100vh-2rem)] md:h-[calc(100vh-8rem)]">
          <div className="flex flex-col md:flex-row h-full rounded-lg overflow-hidden">
            {/* Sidebar with responsive width */}
            <div className="w-full md:w-80 lg:w-96 flex-shrink-0">
              <Sidebar />
            </div>

            {/* Main content area */}

              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;