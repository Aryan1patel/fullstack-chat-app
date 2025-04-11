import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import {io} from "socket.io-client"
import { useChatStore } from "./useChatStore.js";

const BASE_URL = import.meta.env.MODE ==="development"?"http://localhost:5001" : "/"

export const useAuthStore = create((set,get)=>({

    

    authUser: null,  // for storing user data  // if user is authenticated then this will store the user data otherwise null and 
    // help to navigate the user to the home page if user is authenticated
    isSigningUP: false,  // for loading spinner
    isLoggingIn: false,  // for loading spinner
    isUpdatingProfile: false,  // for loading spinner

    isCheckingAuth: true,  // for loading spinner   // this is for checking if the user is authenticated or not
    onlineUsers:[],
    socket:null,


    checkAuth: async () => {

        try {
            const res= await axiosInstance.get("/auth/check");   // full url: http://localhost:5000/api/auth/check getting from backend
            set ({authUser: res.data.user})  // getting the user data from the backend

            get().connectSocket();

        } catch (error) {
            set({authUser: null})
            console.log("Erro in checkAuth: ",error) 
        }
        finally{
            set({isCheckingAuth: false})
        }
    },

    signup: async(data) =>{
        set({isSigningUP: true})
        try {
           const res= await axiosInstance.post("/auth/signup",data);  // full url: http://localhost:5000/api/auth/signup getting from backend
           set({authUser: res.data})  // setting the user data in the state mean user is authenticated and logged in
           toast.success("Account created successfully")

           get().connectSocket();

            
        } catch (error) {
            toast.error(error.response.data.message)
            
            console.log("Signup Error:", error.response ? error.response.data : error.message);
           
            
        }
        finally{
            set({isSigningUP: false})
        }

    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser: null})
            toast.success("Logout successfully")

            get().dissconnectSocket();
            
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

  
    login: async (data) => {
        set({ isLoggingIn: true });
    
        try {
            const res = await axiosInstance.post("/auth/login", data);

    
            setTimeout(() => {
                set({ authUser: res.data });
                toast.success("Login successfully");
                get().connectSocket();
            }, 1500);

            
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            setTimeout(() => {
                set({ isLoggingIn: false });
            }, 1500); // Delay removing the loading state for smoother UI
        }
    },
    
    
    updateProfile : async(data) => {

        set({isUpdatingProfile: true})

        try {
            
            const res= await axiosInstance.put("/auth/update-profile",data);
            set({authUser: res.data})
            toast.success("Profile updated successfully")
        } catch (error) {
            console.log("Error in updateProfile: ",error)
            toast.error(error.response.data.message)
            
        }
        finally{
            set({isUpdatingProfile: false})
        }
        
    },


    connectSocket: async()=>{

        const {authUser}= get();

        if(!authUser || get.socket?.connected) return;


        const socket =io(BASE_URL, {
            query:{
                userId: authUser._id  // giveing the user id to the socket to know who is connected and add the user id to the online user map
            }
        })
        socket.connect();
        set({socket: socket})

        socket.on("getOnlineUsers", (userids) => {    
            set({onlineUsers: userids})
        })

        socket.on("updateSidebar", () => {     // updating the no of unread messages in real time

            get.getUser();

        })

    },


    dissconnectSocket: async()=>{

        if(get().socket?.connected) get().socket.disconnect();

    }



    

  





}







))


