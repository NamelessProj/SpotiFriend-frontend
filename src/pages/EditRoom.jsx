import {Navigate, useParams} from "react-router-dom";
import {useAuthStore} from "../stores/authStore.js";

const EditRoom = () => {
    const {id} = useParams();
    const {userInfo} = useAuthStore();

    return (
        <main>
            {userInfo ? (
                <div>
                    {id}
                </div>
            ):(
                <Navigate to="/" />
            )}
        </main>
    );
};

export default EditRoom;