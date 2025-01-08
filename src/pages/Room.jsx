import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useRoomStore} from "../stores/roomStore.js";
import {Alert, Button, Card, CardBody, CardFooter, Input, Typography} from "@material-tailwind/react";
import axios from "axios";
import NProgress from "nprogress";
import {usePropositionStore} from "../stores/propositionStore.js";
import DefaultSpinner from "../components/DefaultSpinner.jsx";
import {toast} from "react-toastify";

const Room = () => {
    const {id} = useParams();

    const {room, roomLoading, roomError, getRoomById} = useRoomStore();
    const {propositionError, propositionSuccess, sendProposition} = usePropositionStore();

    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [searchNext, setSearchNext] = useState(null);
    const [searchInput, setSearchInput] = useState("");
    const [error, setError] = useState("");
    const [token, setToken] = useState(null);
    const [tracksNumber, setTracksNumber] = useState(0);

    useEffect(() => {
        getRoomById(id);
    }, [id]);

    useEffect(() => {
        if(propositionError) toast(propositionError, {type: "error"});
    }, [propositionError]);

    useEffect(() => {
        if(propositionSuccess) toast("Proposition sent.", {type: "success"});
    }, [propositionSuccess]);

    const handleSearch = async (e) => {
        e.preventDefault();
        setError("");
        let accessToken = token;

        const search = searchInput.trim();

        if(search === ""){
            setError("Please enter a search query.");
            return;
        }

        NProgress.start();
        setLoading(true);

        // Checking if the token is available and if it is expired
        const oneHourBefore = new Date().getTime() - 3600000;
        if(!accessToken || accessToken.createdAt < oneHourBefore){
            try{
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/access`);
                setToken(response.data.token);
                accessToken = response.data.token;
            }catch(error){
                setError(error.response.data.message || error.message);
                NProgress.done();
                return;
            }
        }

        try{
            const response = await axios.get(`https://api.spotify.com/v1/search?q=${search}&type=track&market=CH`, {
                headers: {
                    'Authorization': `Bearer ${accessToken.token}`
                }
            });
            setSearchResults(response.data.tracks.items);
            setSearchNext(response.data.tracks.next);
            setTracksNumber(response.data.tracks.total);
        }catch(error){
            setError(error.message);
        }finally{
            setLoading(false);
            NProgress.done();
        }
    }

    const handleLoadMore = async () => {
        setError("");
        let accessToken = token;

        NProgress.start();

        // Checking if the token is available and if it is expired
        const oneHourBefore = new Date().getTime() - 3600000;
        if(!accessToken || accessToken.createdAt < oneHourBefore){
            try{
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/access`);
                setToken(response.data.token);
                accessToken = response.data.token;
            }catch(error){
                toast(error.response.data.message || error.message, {type: "error"});
                NProgress.done();
                return;
            }
        }

        try{
            const response = await axios.get(searchNext, {
                headers: {
                    'Authorization': `Bearer ${accessToken.token}`
                }
            });
            setSearchResults((prev) => [...prev, ...response.data.tracks.items]);
            setSearchNext(response.data.tracks.next);
        }catch(error){
            toast(error.message, {type: "error"});
        }finally{
            NProgress.done();
        }
    }

    const handleSendProposition = async (e, song) => {
        e.preventDefault();

        try{
            NProgress.start();
            await sendProposition(id, {song});
        }catch(error){
            console.error(error);
        }finally{
            NProgress.done();
        }
    }

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
                <div className="h-full flex justify-center items-center">
                    <DefaultSpinner />
                </div>
            ):(
                <>
                    {room ? (
                        <section>
                            <div className="flex flex-col items-center mb-12">
                                <Typography variant="h2" className="text-primary-white">
                                    {room.name}
                                </Typography>
                                <Typography variant="lead" className="text-primary-white">
                                    {room.description}
                                </Typography>
                                {tracksNumber > 0 ? (
                                    <Typography className="text-primary-white">
                                        {tracksNumber} track{tracksNumber > 1 && "s"}
                                    </Typography>
                                ):(
                                    <Typography className="text-primary-white">
                                        Start searching for songs
                                    </Typography>
                                )}
                            </div>
                            <div>
                                <Card className="max-w-[800px] mx-auto">
                                    <CardBody>
                                        {error && (
                                            <div className="mb-6 flex justify-center">
                                                <Alert color="red">
                                                    {error}
                                                </Alert>
                                            </div>
                                        )}
                                        <form className="flex gap-3 flex-wrap md:flex-nowrap" onSubmit={handleSearch}>
                                            <Input
                                                value={searchInput}
                                                onChange={(e) => setSearchInput(e.target.value)}
                                                label="Search"
                                                type="search"
                                            />
                                            <Button color="green" variant="gradient" className="flex-grow" onClick={handleSearch}>
                                                Search
                                            </Button>
                                        </form>
                                    </CardBody>
                                </Card>
                            </div>
                            <div className="mt-12">
                                {loading ? (
                                    <div className="h-full flex justify-center items-center">
                                        <DefaultSpinner />
                                    </div>
                                ):(
                                    <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
                                        {searchResults.length ? (
                                            <>
                                                {searchResults.map((track) => (
                                                    <Card key={track.id}>
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
                                                                Send Proposition
                                                            </Button>
                                                        </CardFooter>
                                                    </Card>
                                                ))}
                                                {searchNext && (
                                                    <div className="flex justify-center my-6">
                                                        <Button color="green" variant="gradient" onClick={handleLoadMore}>
                                                            Load More
                                                        </Button>
                                                    </div>
                                                )}
                                            </>
                                        ):(
                                            <div>
                                                <Typography variant="lead" className="text-primary-white text-center">
                                                    Try searching for a song.
                                                </Typography>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </section>
                    ):(
                        <div>
                            <Typography variant="h2" className="text-primary-white text-center">
                                Room not found.
                            </Typography>
                        </div>
                    )}
                </>
            )}
        </main>
    );
};

export default Room;