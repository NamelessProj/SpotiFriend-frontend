import {Outlet} from "react-router-dom";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";

const Layout = () => {
    return (
        <div className="grid grid-rows-app min-h-[100svh] bg-primary-black">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Layout;