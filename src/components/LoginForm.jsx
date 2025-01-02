import {Alert, Button, Card, CardBody, CardHeader, Input, Typography} from "@material-tailwind/react";
import {useEffect, useState} from "react";
import {useUserStore} from "../stores/userStore.js";
import {useAuthStore} from "../stores/authStore.js";
import NProgress from "nprogress";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const {user, login} = useUserStore();
    const {setCredentials} = useAuthStore();

    useEffect(() => {
        if(user){
            setCredentials(user);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const emailForm = email.trim();
        const passwordForm = password.trim();

        if(emailForm === "" || passwordForm === ""){
            setError("Please fill in all the fields.");
            return;
        }

        try{
            NProgress.start();
            await login({email: emailForm, password: passwordForm});
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
                        Login
                    </Typography>
                </CardHeader>
                <CardBody>
                    {error && (
                        <Alert color="red" className="mb-6">
                            {error}
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
                        />
                        <Input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            size="lg"
                            type="password"
                            label="Password"
                        />
                        <Button color="green" variant="gradient" onClick={handleSubmit}>
                            Login
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
};

export default LoginForm;