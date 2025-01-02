import {Typography} from "@material-tailwind/react";

const ErrorPage = () => {
    return (
        <main className="h-full flex flex-col justify-center items-center text-primary-white">
            <Typography variant="h2" as="p">
                Error
            </Typography>
            <Typography variant="h1" className="text-7xl text-primary-green">
                404
            </Typography>
            <Typography variant="h2" as="p">
                Not Found
            </Typography>
        </main>
    );
};

export default ErrorPage;