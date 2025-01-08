import {Outlet} from "react-router-dom";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import {ToastContainer} from "react-toastify";

const Layout = () => {
    return (
        <div className="grid grid-rows-app min-h-[100svh] bg-primary-black">
            <ToastContainer theme="dark" />
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Layout;