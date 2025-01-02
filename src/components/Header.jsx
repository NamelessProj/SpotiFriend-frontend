import {Typography} from "@material-tailwind/react";

const Header = () => {
    return (
        <header className=" flex justify-center">
            <Typography variant="h2" as="p" className="text-primary-green">
                SpotiFriend
            </Typography>
        </header>
    );
};

export default Header;