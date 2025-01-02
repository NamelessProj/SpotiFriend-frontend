import {Tab, TabPanel, Tabs, TabsBody, TabsHeader} from "@material-tailwind/react";
import LoginForm from "../components/LoginForm.jsx";
import RegisterForm from "../components/RegisterForm.jsx";
import {useAuthStore} from "../stores/authStore.js";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const {userInfo} = useAuthStore();

    const navigate = useNavigate();

    useEffect(() => {
        if(userInfo){
            navigate("/");
        }
    }, [navigate, userInfo]);

    return (
        <main>
            <div className="max-w-[500px] mx-auto mt-6">
                <Tabs value="login">
                    <TabsHeader className="mb-3">
                        <Tab value="login">
                            Login
                        </Tab>
                        <Tab value="register">
                            Register
                        </Tab>
                    </TabsHeader>
                    <TabsBody
                        animate={{
                            initial: { x: 250 },
                            mount: { x: 0 },
                            unmount: { x: 250 },
                        }}
                    >
                        <TabPanel value="login">
                            <LoginForm />
                        </TabPanel>
                        <TabPanel value="register">
                            <RegisterForm />
                        </TabPanel>
                    </TabsBody>
                </Tabs>
            </div>
        </main>
    );
};

export default Login;