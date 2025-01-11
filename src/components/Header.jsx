import {Button, Menu, MenuHandler, MenuItem, MenuList, Typography} from "@material-tailwind/react";
import {useAuthStore} from "../stores/authStore.js";
import {Link} from "react-router-dom";
import NProgress from "nprogress";
import {useUserStore} from "../stores/userStore.js";

const Header = () => {
    const {userInfo, logout} = useAuthStore();
    const {userLogout} = useUserStore();

    const handleLogout = async (e) => {
        e.preventDefault();

        try{
            NProgress.start();
            await userLogout();
            logout();
        }catch(error){
            console.error(error);
        }finally{
            NProgress.done();
        }
    }

    return (
        <header className="flex flex-col-reverse gap-2 justify-center items-center my-2 relative">
            <Link to="/">
                <Typography variant="h2" as="p" className="text-primary-green">
                    SpotiFriend
                </Typography>
            </Link>

            <div className="md:absolute top-1/2 right-2 md:transform md:-translate-y-1/2">
                {userInfo ? (
                    <Menu>
                        <MenuHandler>
                            <Button size="sm" color="green" className="text-primary-black">
                                {userInfo.username}
                            </Button>
                        </MenuHandler>
                        <MenuList>
                            <MenuItem className="flex">
                                <Link to="profile" className="flex-grow">
                                    Profile
                                </Link>
                            </MenuItem>
                            <MenuItem className="flex">
                                <Link to="rooms" className="flex-grow">
                                    Rooms
                                </Link>
                            </MenuItem>
                            <MenuItem className="flex">
                                <Button className="flex-grow" color="red" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                ):(
                    <Button size="sm" color="green" className="text-primary-black">
                        <Link to="login">
                            Login
                        </Link>
                    </Button>
                )}
            </div>
        </header>
    );
};

export default Header;