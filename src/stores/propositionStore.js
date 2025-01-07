import {create} from "zustand";
import axios from "axios";

export const usePropositionStore = create((set) => ({
    propositionError: null,
    propositionLoading: false,

    sendProposition: async (id, data) => {
        set({propositionLoading: true, propositionError: null});
        try{
            await axios.post(`${import.meta.env.VITE_API_URL}/proposition/${id}`, data);
            set(() => ({propositionLoading: false}));
        }catch(error){
            set({propositionError: error.response.data.message || error.message, propositionLoading: false});
        }
    }
}));