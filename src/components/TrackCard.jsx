import {Button, Card, CardBody, CardFooter, Tooltip, Typography} from "@material-tailwind/react";

const TrackCard = ({track, handleSendProposition}) => {
    return (
        <Card>
            <CardBody className="grid grid-rows-[1fr_auto] grid-cols-[120px_1fr] md:gap-x-3 overflow-clip">
                <div className="h-24 mb-4 row-span-2">
                    <img src={track.album.images[0].url} alt={track.name} loading="lazy" className="h-full object-cover mb-4 rounded-lg"/>
                </div>
                <Tooltip placement="top-start" content={track.name}>
                    <Typography variant="h3" className="text-nowrap whitespace-nowrap overflow-clip w-[calc(100%-15px)]" style={{textOverflow: "ellipsis"}}>
                        {track.name}
                    </Typography>
                </Tooltip>
                <Typography>
                    {track.artists.map((artist) => artist.name).join(", ")}
                </Typography>
            </CardBody>
            <CardFooter className="flex mt-0 pt-0">
                <Button color="green" variant="gradient" className="flex-grow" onClick={(e) => handleSendProposition(e, track)}>
                    Send Proposition
                </Button>
            </CardFooter>
        </Card>
    );
};

export default TrackCard;