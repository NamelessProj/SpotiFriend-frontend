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
        const slug = input.trim();
        if(slug === ""){
            setError("Please enter a valid room slug.");
        }else navigate(`/room/${slug}`);
    }

    return (
        <main>
            <div className="h-full flex items-center">
                <Card className="w-[min(500px,100%)] mx-auto my-6">
                    <CardHeader floated={false} shadow={false}>
                        <Typography variant="h5">
                            Have the slug of the room you want to join?
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
                                label="Enter the room slug."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                variant="outlined"
                                className="rounded-b-none"
                                required
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