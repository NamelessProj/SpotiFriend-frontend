import {Button, Card, CardBody, CardFooter, Typography} from "@material-tailwind/react";

const TrackCard = ({track, handleSendProposition}) => {
    return (
        <Card>
            <CardBody className="flex flex-col items-center md:grid grid-rows-2 grid-cols-[120px_1fr] md:gap-x-3">
                <div className="h-32 md:h-12 mb-4 md:row-span-2">
                    <img src={track.album.images[0].url} alt={track.name} loading="lazy" className="h-32 md:h-auto object-cover mb-4 rounded-lg"/>
                </div>
                <Typography variant="h3">
                    {track.name}
                </Typography>
                <Typography>
                    {track.artists.map((artist) => artist.name).join(", ")}
                </Typography>
            </CardBody>
            <CardFooter className="flex md:mt-3">
                <Button color="green" variant="gradient" className="flex-grow" onClick={(e) => handleSendProposition(e, track)}>
                    Send Proposition
                </Button>
            </CardFooter>
        </Card>
    );
};

export default TrackCard;