import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useRoomStore} from "../stores/roomStore.js";
import {Alert, Typography} from "@material-tailwind/react";

const Room = () => {
    const {id} = useParams();

    const {room, roomLoading, roomError, getRoomById} = useRoomStore();

    useEffect(() => {
        getRoomById(id);
    }, [id]);

    return (
        <main>
            {roomError && (
                <div className="my-6 flex justify-center items-center">
                    <Alert color="red" className="w-fit">
                        {roomError}
                    </Alert>
                </div>
            )}
            {roomLoading ? (
                <p>Loading...</p>
            ):(
                <>
                    {room ? (
                        <div>
                            <div>
                                <Typography variant="h2" className="text-primary-white">
                                    {room.name}
                                </Typography>
                                <Typography className="text-primary-white">
                                    {room.description}
                                </Typography>
                            </div>
                        </div>
                    ):(
                        <p>No room</p>
                    )}
                </>
            )}
        </main>
    );
};

export default Room;