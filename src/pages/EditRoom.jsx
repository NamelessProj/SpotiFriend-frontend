import {Link, Navigate, useParams} from "react-router-dom";
import {useAuthStore} from "../stores/authStore.js";
import {Alert, Button, Card, CardBody, CardHeader, Checkbox, Input, Typography} from "@material-tailwind/react";
import {useRoomStore} from "../stores/roomStore.js";
import {useEffect, useState} from "react";
import DefaultSpinner from "../components/DefaultSpinner.jsx";
import NProgress from "nprogress";
import {toast} from "react-toastify";

const EditRoom = () => {
    const {id} = useParams();
    const {userInfo} = useAuthStore();
    const {room, roomError, roomLoading, roomSuccess, getRoomById, updateRoom} = useRoomStore();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if(room){
            setName(room.name);
            setDescription(room.description);
            setIsPublic(room.isPublic);
        }
    }, [room]);

    useEffect(() => {
        if(roomSuccess) toast("Room updated.", {type: "success"});
    }, [roomSuccess]);

    useEffect(() => {
        if(userInfo) getRoomById(id);
    }, [id]);

    const handleUpdateRoom = async (e) => {
        e.preventDefault();
        setError("");

        const roomName = name.trim();
        const roomDescription = description.trim();

        if(roomName === "" || roomDescription === ""){
            setError("Please fill in all the fields.");
            return;
        }

        try{
            NProgress.start();
            await updateRoom(id, {name: roomName, description: roomDescription, isPublic});
        }catch(error){
            console.error(error);
        }finally{
            NProgress.done();
        }
    }

    return (
        <main>
            {userInfo ? (
                <div className="h-full">
                    {roomError && (
                        <div className="flex justify-center">
                            <Alert color="red" className="w-fit">
                                {roomError}
                            </Alert>
                        </div>
                    )}
                    {roomLoading ? (
                        <div className="h-full flex justify-center items-center">
                            <DefaultSpinner />
                        </div>
                    ):(
                        <>
                            {room ? (
                                <div className="mt-12">
                                    <Card className="max-w-[500px] mx-auto">
                                        <CardHeader color="green" className="flex flex-col justify-center items-center relative">
                                            <div className="absolute top-2 left-2">
                                                <Button color="black" size="sm" variant="text">
                                                    <Link to="/rooms">
                                                        Back
                                                    </Link>
                                                </Button>
                                            </div>
                                            <Typography variant="h2">
                                                Edit Room
                                            </Typography>
                                            <Typography variant="h1">
                                                {room.name}
                                            </Typography>
                                        </CardHeader>
                                        <CardBody>
                                            {error && (
                                                <Alert color="red" className="mb-6">
                                                    {error}
                                                </Alert>
                                            )}
                                            <form className="flex flex-col gap-3" onSubmit={handleUpdateRoom}>
                                                <Input
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    label="Name"
                                                    required
                                                />
                                                <Input
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    label="Description"
                                                    required
                                                />
                                                <Checkbox
                                                    checked={isPublic}
                                                    onChange={(e) => setIsPublic(e.target.checked)}
                                                    label="Is Public"
                                                    color="green"
                                                />
                                                <div className="px-2">
                                                    <Typography variant="small">
                                                        Link:
                                                    </Typography>
                                                    <Typography variant="lead" className="w-full text-nowrap whitespace-nowrap overflow-clip" style={{textOverflow: "ellipsis"}}>
                                                        {window.location.origin}/room/{room.slug}
                                                    </Typography>
                                                </div>
                                                <Button color="green" variant="gradient" onClick={handleUpdateRoom}>
                                                    Update Room
                                                </Button>
                                            </form>
                                        </CardBody>
                                    </Card>
                                </div>
                            ):(
                                <Typography variant="lead" className="text-center text-primary-white">
                                    Room not found.
                                </Typography>
                            )}
                        </>
                    )}
                </div>
            ):(
                <Navigate to="/" />
            )}
        </main>
    );
};

export default EditRoom;