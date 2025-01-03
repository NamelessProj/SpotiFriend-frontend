import {Navigate, Outlet} from "react-router-dom";
import {useAuthStore} from "../stores/authStore.js";

const AdminLayout = () => {
    const {userInfo} = useAuthStore();

    return (
        <>
            {userInfo && userInfo.role === "admin" ? (
                <Outlet />
            ):(
                <Navigate to="/" />
            )}
        </>
    );
};

export default AdminLayout;