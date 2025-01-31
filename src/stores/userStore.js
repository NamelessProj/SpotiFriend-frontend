import {create} from "zustand";
import axios from "axios";

export const useUserStore = create((set) => ({
    user: null,
    userLoading: false,
    userError: null,
    userDeleteSuccess: false,

    register: async (data) => {
        set({userLoading: true, userError: null});
        try{
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/register`, data, {
                withCredentials: true,
                method: "post",
            });
            set(() => ({user: response.data.user, userLoading: false}));
        }catch(error){
            set({userError: error.response.data.message || error.message, userLoading: false});
        }
    },

    login: async (data) => {
        set({userLoading: true, userError: null});
        try{
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, data, {
                withCredentials: true,
                method: "post",
            });
            set(() => ({user: response.data.user, userLoading: false}));
        }catch(error){
            console.log(error);
            set({userError: error.response.data.message || error.message, userLoading: false});
        }
    },

    updateUser: async (data) => {
        set({userLoading: true, userError: null});
        try{
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/user`, data, {
                withCredentials: true,
                method: "put",
            });
            set(() => ({user: response.data.user, userLoading: false}));
        }catch(error){
            set({userError: error.response.data.message || error.message, userLoading: false});
        }
    },

    updateUserPassword: async (data) => {
        set({userLoading: true, userError: null});
        try{
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/user/password`, data, {
                withCredentials: true,
                method: "put",
            });
            set(() => ({user: response.data.user, userLoading: false}));
        }catch(error){
            set({userError: error.response.data.message || error.message, userLoading: false});
        }
    },

    userLogout: async () => {
        set({userLoading: true, userError: null});
        try{
            await axios.post(`${import.meta.env.VITE_API_URL}/user/logout`, null, {
                method: 'post',
                withCredentials: true,
            });
            set(() => ({user: null, userLoading: false}));
        }catch(error){
            set({userError: error.response.data.message || error.message, userLoading: false});
        }
    },

    deleteUser: async (data) => {
        set({userLoading: true, userError: null, userDeleteSuccess: false});
        try{
            await axios.post(`${import.meta.env.VITE_API_URL}/user/delete`, data, {
                method: 'post',
                withCredentials: true,
            });
            set(() => ({user: null, userLoading: false, userDeleteSuccess: true}));
        }catch(error){
            set({userError: error.response.data.message || error.message, userLoading: false});
        }
    }
}));