import {create} from "zustand";
import axios from "axios";

export const useTokenStore = create((set) => ({
    token: null,
    tokenError: null,

    getToken: async () => {
        set({tokenError: null});
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/access`, {
                withCredentials: true,
                method: "get",
            });
            set(() => ({token: response.data.token}));
        }catch(error){
            set({tokenError: error.response.data.message || error.message});
        }
    }
}));