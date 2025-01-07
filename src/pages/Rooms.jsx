import {useAuthStore} from "../stores/authStore.js";
import {Link, Navigate} from "react-router-dom";
import {useRoomStore} from "../stores/roomStore.js";
import {useEffect, useState} from "react";
import {Alert, Button, Card, CardBody, CardFooter, Checkbox, Input, Typography} from "@material-tailwind/react";
import NProgress from "nprogress";

const Rooms = () => {
    const {userInfo} = useAuthStore();
    const {rooms, roomLoading, roomError, getRoomsOfUser, createRoom, deleteRoom} = useRoomStore();

    const [roomName, setRoomName] = useState("");
    const [roomDescription, setRoomDescription] = useState("");
    const [roomIsPublic, setRoomIsPublic] = useState(false);
    const [roomCount, setRoomCount] = useState(0);

    const [error, setError] = useState("");

    useEffect(() => {
        if(userInfo) getRoomsOfUser();
    }, []);

    useEffect(() => {
        setRoomCount(rooms.length);
    }, [rooms]);

    const handleCreateRoom = async (e) => {
        e.preventDefault();
        setError("");

        if(roomCount >= 10){
            setError("You can't have more than 10 rooms.");
            return;
        }

        const name = roomName.trim();
        const description = roomDescription.trim();
        const isPublic = roomIsPublic;

        if(name === "" || description === ""){
            setError("Please fill in all the fields.");
            return;
        }

        try{
            NProgress.start();
            await createRoom({name, description, isPublic});
        }catch(error){
            console.error(error);
        }finally{
            NProgress.done();
        }
    }

    const handleDeleteRoom = async (e, id) => {
        e.preventDefault();

        try{
            NProgress.start();
            await deleteRoom(id);
        }catch(error){
            console.error(error);
        }finally{
            NProgress.done();
        }
    }

    return (
        <main>
            {userInfo ? (
                <div>
                    <Typography variant="h1" as="h2" className="text-center text-primary-white">
                        Your Rooms
                    </Typography>
                    {roomError && (
                        <div className="my-6 flex justify-center items-center">
                            <Alert color="red" className="w-fit">
                                {roomError}
                            </Alert>
                        </div>
                    )}
                    <section>
                        {roomLoading ? (
                            <p>Loading...</p>
                        ):(
                            <div className="flex flex-col gap-3 items-center">
                                {roomCount < 10 ? (
                                    <Card className="my-6" style={{minWidth: "min(100%, 500px)"}}>
                                        <CardBody>
                                            {error && (
                                                <div className="mb-6 flex justify-center">
                                                    <Alert color="red">
                                                        {error}
                                                    </Alert>
                                                </div>
                                            )}
                                            <form className="flex flex-col gap-3" onSubmit={handleCreateRoom}>
                                                <Input
                                                    value={roomName}
                                                    onChange={(e) => setRoomName(e.target.value)}
                                                    label="Room Name"
                                                    required
                                                />
                                                <Input
                                                    value={roomDescription}
                                                    onChange={(e) => setRoomDescription(e.target.value)}
                                                    label="Room Description"
                                                    required
                                                />
                                                <Checkbox
                                                    checked={roomIsPublic}
                                                    onChange={(e) => setRoomIsPublic(e.target.checked)}
                                                    label="Public Room"
                                                    color="green"
                                                />
                                                <Button color="green" variant="gradient" onClick={handleCreateRoom}>
                                                    Create Room
                                                </Button>
                                            </form>
                                        </CardBody>
                                    </Card>
                                ):(
                                    <Alert color="red" className="my-6 w-fit">
                                        You can't have more than 10 rooms.
                                    </Alert>
                                )}
                                {rooms.length ? (
                                    <div className="mt-6">
                                        {rooms.map((room, index) => (
                                            <Card key={index} style={{width: "min(100%, 500px)"}}>
                                                <CardBody className="relative">
                                                    <div className="absolute top-2 left-2 w-4 h-4 rounded-full" style={{background: room.isPublic ? 'green' : 'red'}} />
                                                    <Typography variant="h5" className="mb-2">
                                                        {room.name}
                                                    </Typography>
                                                    <Typography>
                                                        {room.description}
                                                    </Typography>
                                                    <Typography className="overflow-clip">
                                                        {import.meta.env.VITE_BASE_URL}/room/{room._id}
                                                    </Typography>
                                                </CardBody>
                                                <CardFooter className="flex justify-between">
                                                    <Button color="green" variant="gradient">
                                                        <Link to={`/room/edit/${room._id}`}>
                                                            Edit
                                                        </Link>
                                                    </Button>
                                                    <Button color="red" variant="gradient" onClick={(e) => handleDeleteRoom(e, room._id)}>
                                                        Delete
                                                    </Button>
                                                </CardFooter>
                                            </Card>
                                        ))}
                                    </div>
                                ):(
                                    <Typography variant="lead" className="text-center text-primary-white">
                                        No rooms
                                    </Typography>
                                )}
                            </div>
                        )}
                    </section>
                </div>
            ):(
                <Navigate to="/login" />
            )}
        </main>
    );
};

export default Rooms;