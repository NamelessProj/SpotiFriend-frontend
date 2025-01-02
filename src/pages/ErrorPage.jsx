import {Typography} from "@material-tailwind/react";

const ErrorPage = () => {
    return (
        <main className="h-full flex flex-col justify-center items-center text-primary-white">
            <Typography variant="h1" className="text-7xl">
                404
            </Typography>
            <Typography variant="h2">
                Not Found
            </Typography>
        </main>
    );
};

export default ErrorPage;