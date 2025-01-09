import {useEffect, useState} from "react";
import {useUserStore} from "../stores/userStore.js";
import {useAuthStore} from "../stores/authStore.js";
import {Alert, Button, Card, CardBody, CardHeader, Input, Typography} from "@material-tailwind/react";
import NProgress from "nprogress";

const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");

    const {user, userError, register} = useUserStore();
    const {setCredentials} = useAuthStore();

    useEffect(() => {
        if(user){
            setCredentials(user);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        const emailForm = email.trim();
        const passwordForm = password.trim();
        const confirmPasswordForm = confirmPassword.trim();
        const usernameForm = username.trim();

        if(emailForm === "" || passwordForm === "" || confirmPasswordForm === "" || usernameForm === ""){
            setError("Please fill in all the fields.");
            return;
        }

        if(!emailRegex.test(emailForm)){
            setError("Please enter a valid email.");
            return;
        }

        if(passwordForm !== confirmPasswordForm){
            setError("Passwords do not match.");
            return;
        }

        try{
            NProgress.start();
            await register({email: emailForm, password: passwordForm, username: usernameForm});
        }catch(error){
            setError(error);
        }finally{
            NProgress.done();
        }
    }

    return (
        <div className="mt-6 flex justify-center">
            <Card className="w-96">
                <CardHeader variant="gradient" color="green" className="mb-4 grid h-28 place-items-center">
                    <Typography variant="h3">
                        Register
                    </Typography>
                </CardHeader>
                <CardBody>
                    {error && (
                        <Alert color="red" className="mb-6">
                            {error}
                        </Alert>
                    )}
                    {userError && (
                        <Alert color="red" className="mb-6">
                            {userError}
                        </Alert>
                    )}
                    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            inputMode="email"
                            size="lg"
                            label="Email"
                            required
                        />
                        <Input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            size="lg"
                            label="Username"
                            required
                        />
                        <Input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            size="lg"
                            type="password"
                            label="Password"
                            required
                        />
                        <Input
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            size="lg"
                            type="password"
                            label="Confirm Password"
                            required
                        />
                        <Button color="green" variant="gradient" onClick={handleSubmit}>
                            Register
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
};

export default RegisterForm;