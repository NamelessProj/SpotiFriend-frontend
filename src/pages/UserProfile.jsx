import {useAuthStore} from "../stores/authStore.js";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    Alert,
    Button,
    Card,
    CardBody,
    CardHeader,
    Dialog, DialogBody, DialogFooter,
    DialogHeader,
    Input,
    Typography
} from "@material-tailwind/react";
import {useUserStore} from "../stores/userStore.js";
import NProgress from "nprogress";

const UserProfile = () => {
    const {userInfo, setCredentials, logout} = useAuthStore();
    const {user, userError, userDeleteSuccess, updateUser, updateUserPassword, deleteUser} = useUserStore();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [editPasswordError, setEditPasswordError] = useState("");

    const [deletePassword, setDeletePassword] = useState("");
    const [deleteError, setDeleteError] = useState("");

    const [openDialog, setOpenDialog] = useState(false);
    const handleOpen = () => setOpenDialog(!openDialog);

    const navigate = useNavigate();

    useEffect(() => {
        if(userInfo){
            setUsername(userInfo.username);
            setEmail(userInfo.email);
        }else navigate("/login");
    }, [userInfo, navigate]);

    useEffect(() => {
        if(userDeleteSuccess){
            logout();
            navigate("/");
        }
    }, [userDeleteSuccess]);

    useEffect(() => {
        if(user) setCredentials(user);
    }, [user]);

    const handleEdit = async (e) => {
        e.preventDefault();
        setError("");

        const usernameForm = username.trim();
        const emailForm = email.trim();

        if(usernameForm === "" || emailForm === ""){
            setError("Please fill in all the fields.");
            return;
        }

        try{
            NProgress.start();
            await updateUser({username: usernameForm, email: emailForm});
        }catch(error){
            setError(error);
        }finally{
            NProgress.done();
        }
    }

    const handleEditPassword = async (e) => {
        e.preventDefault();
        setEditPasswordError("");

        if(currentPassword === "" || newPassword === "" || confirmPassword === ""){
            setEditPasswordError("Please fill in all the fields.");
            return;
        }

        if(newPassword !== confirmPassword){
            setEditPasswordError("Passwords don't match.");
            return;
        }

        try{
            NProgress.start();
            await updateUserPassword({password: currentPassword, newPassword, confirmPassword});
        }catch(error){
            setEditPasswordError(error);
        }finally{
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            NProgress.done();
        }
    }

    const handleOpenDeleteDialog = (e) => {
        e.preventDefault();
        if(deletePassword === ""){
            setDeleteError("Please fill in all the fields.");
            return;
        }
        handleOpen();
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        setDeleteError("");

        if(deletePassword === ""){
            setDeleteError("Please fill in all the fields.");
            return;
        }

        try{
            NProgress.start();
            await deleteUser({password: deletePassword});
        }catch(error){
            setDeleteError(error);
        }finally{
            NProgress.done();
            setOpenDialog(false);
        }
    }

    return (
        <main>
            {userInfo && (
                <div>
                    <Dialog open={openDialog} handler={handleOpen} size="sm">
                        <DialogHeader>
                            <Typography variant="h2" className="text-center text-balance">
                                Are you sure you want to delete your account?
                            </Typography>
                        </DialogHeader>
                        <DialogBody>
                            <Typography>
                                This action is irreversible and will delete all your data.
                            </Typography>
                        </DialogBody>
                        <DialogFooter className="flex justify-between">
                            <Button color="red" onClick={handleOpen}>
                                Cancel
                            </Button>
                            <Button color="red" onClick={handleDelete}>
                                Delete Account
                            </Button>
                        </DialogFooter>
                    </Dialog>
                    {userError && (
                        <div className="mb-6 flex justify-center items-center">
                            <Alert color="red" className="w-fit">
                                {userError}
                            </Alert>
                        </div>
                    )}
                    <div className="mt-12 max-w-[500px] mx-auto">
                        <Card>
                            <CardHeader color="green" variant="gradient" className="flex justify-center items-center py-3">
                                <Typography variant="h1">
                                    {userInfo.username}
                                </Typography>
                            </CardHeader>
                            <CardBody>
                                {error && (
                                    <Alert color="red" className="mb-3">
                                        {error}
                                    </Alert>
                                )}
                                <form className="flex flex-col gap-3" onSubmit={handleEdit}>
                                    <Input
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        label="Username"
                                        required
                                    />
                                    <Input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        label="Email"
                                        required
                                    />
                                    <Button color="green" variant="gradient" onClick={handleEdit}>
                                        Edit
                                    </Button>
                                </form>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="mt-24 max-w-[500px] mx-auto">
                        <Card>
                            <CardHeader color="red" variant="gradient" className="flex justify-center items-center py-3">
                                <Typography variant="h2">
                                    Edit Password
                                </Typography>
                            </CardHeader>
                            <CardBody>
                                {editPasswordError && (
                                    <Alert color="red" className="mb-6">
                                        {editPasswordError}
                                    </Alert>
                                )}
                                <form className="flex flex-col gap-3" onSubmit={handleEditPassword}>
                                    <Input
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        type="password"
                                        label="Current Password"
                                        required
                                    />
                                    <Input
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        type="password"
                                        label="New Password"
                                        required
                                    />
                                    <Input
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        type="password"
                                        label="Confirm Password"
                                        required
                                    />
                                    <Button color="red" variant="gradient" onClick={handleEditPassword}>
                                        Edit Password
                                    </Button>
                                </form>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="my-24 max-w-[500px] mx-auto">
                        <Card>
                            <CardHeader color="red" variant="gradient" className="flex justify-center items-center py-3">
                                <Typography variant="h2">
                                    Delete Account
                                </Typography>
                            </CardHeader>
                            <CardBody>
                                {deleteError && (
                                    <Alert color="red" className="mb-6">
                                        {deleteError}
                                    </Alert>
                                )}
                                <form className="flex flex-col gap-3" onSubmit={handleOpenDeleteDialog}>
                                    <Input
                                        value={deletePassword}
                                        onChange={(e) => setDeletePassword(e.target.value)}
                                        type="password"
                                        label="Password"
                                        required
                                    />
                                    <Button color="red" variant="gradient" onClick={handleOpenDeleteDialog}>
                                        Delete Account
                                    </Button>
                                </form>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            )}
        </main>
    );
};

export default UserProfile;