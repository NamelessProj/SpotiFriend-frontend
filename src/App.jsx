import {Routes, Route} from "react-router-dom";
import Layout from "./components/Layout.jsx";
import AdminLayout from "./components/AdminLayout.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import Room from "./pages/Room.jsx";
import AdminHome from "./pages/AdminHome.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="profile" element={<UserProfile />} />
                <Route path="room/:id" element={<Room />} />
                <Route path="admin" element={<AdminLayout />}>
                    <Route index element={<AdminHome />} />
                </Route>
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </Routes>
    );
}

export default App;