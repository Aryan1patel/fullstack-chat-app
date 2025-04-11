import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useHarleyStore = create((set, get) => ({
    isGenerating: false, // Loading state
    generatedResponse: null, // Store API response

    generateContent: async (prompt) => {
        set({ isGenerating: true });
        try {
            const res = await axiosInstance.post("/generate/harley", { prompt }); // Harley-specific endpoint
            set({ generatedResponse: res.data });
            toast.success("Response generated successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to generate content");
            console.error("Error in generateContent:", error.response?.data || error.message);
        } finally {
            set({ isGenerating: false });
        }
    },

    clearResponse: () => {
        set({ generatedResponse: null });
    },
}));