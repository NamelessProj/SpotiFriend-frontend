import {useParams} from "react-router-dom";

const Room = () => {
    const {id} = useParams();

    return (
        <div className="text-primary-white">
            {id}
        </div>
    );
};

export default Room;