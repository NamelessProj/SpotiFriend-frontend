import {create} from "zustand";

export const useAuthStore = create((set) => ({
    userInfo: localStorage.getItem('spotiUserInfo') ? JSON.parse(localStorage.getItem('spotiUserInfo')) : null,

    setCredentials: (data) => {
        set(() => ({userInfo: data}));
        localStorage.setItem('spotiUserInfo', JSON.stringify(data));
    },

    logout: () => {
        set(() => ({userInfo: null}));
        localStorage.removeItem('spotiUserInfo');
    }
}));