import {Button, Card, CardBody, CardFooter, Typography} from "@material-tailwind/react";

const TrackCard = ({track, handleSendProposition}) => {
    return (
        <Card>
            <CardBody>
                <img src={track.album.images[0].url} alt={track.name} loading="lazy" className="w-full h-48 object-cover mb-4 rounded-lg"/>
                <Typography variant="h3">
                    {track.name}
                </Typography>
                <Typography>
                    {track.artists.map((artist) => artist.name).join(", ")}
                </Typography>
            </CardBody>
            <CardFooter>
                <Button color="green" variant="gradient" onClick={(e) => handleSendProposition(e, track)}>
                    Send d Proposition
                </Button>
            </CardFooter>
        </Card>
    );
};

export default TrackCard;