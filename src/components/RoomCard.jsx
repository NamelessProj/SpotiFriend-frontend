import {Button, Card, CardBody, CardFooter, Typography} from "@material-tailwind/react";
import {Link} from "react-router-dom";

const RoomCard = ({room, handleDeleteRoom}) => {
    const link = `${window.location.origin}/room/${room.slug}`;

    return (
        <Card className="w-[min(500px,100%)]">
            <CardBody className="relative">
                <div className="absolute top-2 left-2 w-4 h-4 rounded-full" style={{background: room.isPublic ? 'green' : 'red'}} />
                <Typography variant="h5" className="mb-2">
                    {room.name}
                </Typography>
                <Typography>
                    {room.description}
                </Typography>
                <Typography className="font-bold text-green-700 opacity-70 hover:opacity-100 text-nowrap w-full overflow-hidden" style={{textOverflow: "ellipsis"}}>
                    <Link to={link}>
                        {link}
                    </Link>
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
    );
};

export default RoomCard;