import {useAuthStore} from "../stores/authStore.js";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Alert, Button, Card, CardBody, CardHeader, Input, Typography} from "@material-tailwind/react";
import {useUserStore} from "../stores/userStore.js";
import NProgress from "nprogress";

const UserProfile = () => {
    const {userInfo, setCredentials, logout} = useAuthStore();
    const {user, userError, userLogout, updateUser} = useUserStore();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const [logoutError, setLogoutError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if(userInfo){
            setUsername(userInfo.username);
            setEmail(userInfo.email);
        }else{
            navigate("/login");
        }
    }, [userInfo, navigate]);

    useEffect(() => {
        if(user) setCredentials(user);
    }, [user]);

    const handleEdit = async (e) => {
        e.preventDefault();
        setError("");

        const usernameForm = username.trim();
        const emailForm = email.trim();

        if(usernameForm === "" || emailForm === ""){
            setError("Please fill in all the fields.");
            return;
        }

        try{
            NProgress.start();
            await updateUser({username: usernameForm, email: emailForm});
        }catch(error){
            setError(error);
        }finally{
            NProgress.done();
        }
    }

    const handleLogout = async (e) => {
        e.preventDefault();
        setLogoutError("");

        try{
            NProgress.start();
            await userLogout();
            logout();
            navigate("/");
        }catch(error){
            setLogoutError(error);
        }finally{
            NProgress.done();
        }
    }

    return (
        <main>
            {userInfo && (
                <div>
                    <div className="flex flex-col gap-3 justify-center items-center">
                        {logoutError && (
                            <Alert color="red">
                                {logoutError}
                            </Alert>
                        )}
                        <Button color="red" variant="gradient" onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                    <div className="mt-12 max-w-[500px] mx-auto">
                        <Card>
                            <CardHeader color="green" variant="gradient" className="flex justify-center items-center">
                                <Typography variant="h1">
                                    {userInfo.username}
                                </Typography>
                            </CardHeader>
                            <CardBody>
                                {error && (
                                    <Alert color="red" className="mb-3">
                                        {error}
                                    </Alert>
                                )}
                                {userError && (
                                    <Alert color="red" className="mb-3">
                                        {userError}
                                    </Alert>
                                )}
                                <form className="flex flex-col gap-3" onSubmit={handleEdit}>
                                    <Input
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        label="Username"
                                    />
                                    <Input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        label="Email"
                                    />
                                    <Button color="green" variant="gradient" onClick={handleEdit}>
                                        Edit
                                    </Button>
                                </form>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            )}
        </main>
    );
};

export default UserProfile;