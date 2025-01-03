import {Alert, Button, Card, CardBody, CardHeader, Input, Typography} from "@material-tailwind/react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const [input, setInput] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleJoinRoom = (e) => {
        e.preventDefault();
        setError("");
        const id = input.trim();
        if(id === ""){
            setError("Please enter a valid room ID.");
        }else navigate(`/room/${id}`);
    }

    return (
        <main>
            <div>
                <Card className="max-w-[500px] mx-auto my-6">
                    <CardHeader floated={false} shadow={false}>
                        <Typography variant="h5">
                            Have the ID of the room you want to join?
                        </Typography>
                    </CardHeader>
                    <CardBody>
                        {error && (
                            <Alert color="red" className="mb-3">
                                {error}
                            </Alert>
                        )}
                        <form className="flex flex-col" onSubmit={handleJoinRoom}>
                            <Input
                                label="Enter the room ID."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                variant="outlined"
                                className="rounded-b-none"
                            />
                            <Button color="green" variant="gradient" className="text-primary-black rounded-t-none" onClick={handleJoinRoom}>
                                Join the Room
                            </Button>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </main>
    );
};

export default Home;