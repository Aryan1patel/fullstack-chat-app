import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";
import { useAuthStore } from "./useAuthStore.js";


export const useChatStore = create((set,get) => ({ 

    messages:[],
    users:[],
    seletedUser:null,
    isUserLoading:false,
    isMessageLoading:false,



    getUser: async ()=>{
        set({isUserLoading:true})

        try {

            const res = await axiosInstance.get("/messages/users");
            set({users: res.data});
            
        } catch (error) {
            toast.error(error.response.data.message)
            
        }
        finally{
            set({isUserLoading:false})
        }
    },

    getMessages : async (userId)=>{

        set({isMessageLoading:true})

        try {

            const res= await axiosInstance.get(`/messages/${userId}`);
            set({messages: res.data, seletedUser: userId})

            console.log("from getmessage ",res.data)
            
        } catch (error) {
            toast.error(error.response.data.message)
            
        }
        finally{
            set({isMessageLoading:false})
        }
    },

    sendMessage: async (messageData) =>{
        const {seletedUser, messages} =get();

        try {
            const res = await axiosInstance.post(`/messages/send/${seletedUser}`,messageData);
            set({messages: [...messages, res.data]})

            console.log(res.data)

            

        } catch (error) {
            toast.error(error.response.data.message)
            
        }

    },

  
    subscribeToMessages: () => {      
        const { selectedUser } = get();
        const socket = useAuthStore.getState().socket;
    
        if (!selectedUser) return;
    
        socket.on("newMessage", (newMessage) => {
            const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
            if (!isMessageSentFromSelectedUser) return;
        
            set({ messages: [...get().messages, newMessage] });
        
            // Reset the unread count for the selected user
            set((state) => ({
                users: state.users.map(user =>
                    user._id === selectedUser._id ? { ...user, unreadCount: 0 } : user
                )
            }))

            
        });
    
        socket.on("getOnlineUsers", (onlineUsers) => {  // when a new user is connected this update the
          set({ onlineUsers });
        });

        socket.on("updateSidebar", () => {                 // updating the no of unread messages in real time this is a funtion 
            // Trigger action to refetch or update sidebar data
            get().getUser();
            
          });


      },

      unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("updateSidebar");   // updating the no of unread messages in real time
        socket.off("newMessage");
        socket.off("getOnlineUsers");
      },

    setSelectedUser: (selectedUser) =>set({selectedUser}),

    markMessagesAsRead: async (userId) => {
        try {
            await axiosInstance.get(`/messages/${userId}`);
            set((state) => ({
                users: state.users.map(user =>
                    user._id === userId ? { ...user, unreadCount: 0 } : user
                )
            }));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },


 }));