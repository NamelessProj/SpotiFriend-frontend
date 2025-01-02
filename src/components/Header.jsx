import {Button, Typography} from "@material-tailwind/react";
import {useAuthStore} from "../stores/authStore.js";
import {Link} from "react-router-dom";

const Header = () => {
    const {userInfo} = useAuthStore();

    return (
        <header className="flex flex-col-reverse gap-2 justify-center items-center my-2 relative">
            <Link to="/">
                <Typography variant="h2" as="p" className="text-primary-green">
                    SpotiFriend
                </Typography>
            </Link>

            <div className="md:absolute top-1/2 right-2 md:transform md:-translate-y-1/2">
                <Button size="sm" color="green" className="text-primary-black">
                    {userInfo ? (
                        <Link to="profile">
                            {userInfo.username}
                        </Link>
                    ):(
                        <Link to="login">
                            Login
                        </Link>
                    )}
                </Button>
            </div>
        </header>
    );
};

export default Header;