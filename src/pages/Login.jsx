import {Tab, TabPanel, Tabs, TabsBody, TabsHeader} from "@material-tailwind/react";
import LoginForm from "../components/LoginForm.jsx";
import RegisterForm from "../components/RegisterForm.jsx";

const Login = () => {
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