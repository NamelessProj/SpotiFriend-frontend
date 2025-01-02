import {Typography} from "@material-tailwind/react";

const Footer = () => {
    return (
        <footer>
            <Typography variant="small" className="text-center font-normal">
                &copy; 2025 <a className="transition hover:text-primary-green" href="https://portfolio-psi-azure-25.vercel.app" target="_blank">Da Silva Pinto Kevin</a>. All rights reserved.
            </Typography>
        </footer>
    );
};

export default Footer;