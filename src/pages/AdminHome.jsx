import {useTokenStore} from "../stores/tokenStore.js";
import {useEffect} from "react";

const AdminHome = () => {
    const {token, getToken} = useTokenStore();

    useEffect(() => {
        if(token){
            const createdAt = new Date(token.createdAt);
            if((new Date() - createdAt) > 1000 * 60 * 60) getToken();
        }else getToken();
    }, []);

    return (
        <div>
            {token && (
                <div className="text-primary-white">
                    {token.token}
                </div>
            )}
        </div>
    );
};

export default AdminHome;