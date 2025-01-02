import {Routes, Route} from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Room from "./pages/Room.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="room" element={<Room />}/>
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </Routes>
    );
}

export default App;