import {Typography} from "@material-tailwind/react";
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <div>
            <Typography variant="h1">
                Home
            </Typography>
            <Link to="room">Room</Link>
        </div>
    );
};

export default Home;