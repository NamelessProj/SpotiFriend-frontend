import {create} from "zustand";
import axios from "axios";

export const useRoomStore = create((set) => ({
    room: null,
    rooms: [],
    roomLoading: false,
    roomError: null,

    getRoomById: async (id) => {
        set({roomLoading: true, roomError: null});
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/room/${id}`);
            set(() => ({room: response.data.room, roomLoading: false}));
        }catch(error){
            set({roomError: error.response.data.message || error.message, roomLoading: false});
        }
    },

    getRoomsOfUser: async () => {
        set({roomLoading: true, roomError: null});
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/room`, {
                withCredentials: true,
                method: "get",
            });
            set(() => ({rooms: response.data.rooms, roomLoading: false}));
        }catch(error){
            set({roomError: error.response.data.message || error.message, roomLoading: false});
        }
    },

    createRoom: async (data) => {
        set({roomLoading: true, roomError: null});
        try{
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/room`, data, {
                withCredentials: true,
                method: "post",
            });
            set(() => ({room: response.data.room, roomLoading: false}));
        }catch(error){
            set({roomError: error.response.data.message || error.message, roomLoading: false});
        }
    },

    updateRoom: async (id, data) => {
        set({roomLoading: true, roomError: null});
        try{
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/room/${id}`, data, {
                withCredentials: true,
                method: "put",
            });
            set(() => ({room: response.data.room, roomLoading: false}));
        }catch(error){
            set({roomError: error.response.data.message || error.message, roomLoading: false});
        }
    },

    deleteRoom: async (id) => {
        set({roomLoading: true, roomError: null});
        try{
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/room/${id}`, {
                withCredentials: true,
                method: "delete",
            });
            set(() => ({rooms: response.data.rooms, roomLoading: false}));
        }catch(error) {
            set({roomError: error.response.data.message || error.message, roomLoading: false});
        }
    }
}));