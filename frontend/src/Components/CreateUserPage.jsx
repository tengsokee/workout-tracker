import React, {useState} from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";

const CreateUserPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleAddUser = async () => {
        const newUser = {
            User_Username: username,
            User_Password: password,
            User_Email: email,
        };
        try {
            const response = await axios.post("http://localhost:3000/api/users", newUser);
            console.log("User created:", response.data);
            setUsername("");
            setPassword("");
            setEmail("");
            setErrorMessage("");
        } catch (error) {
            setErrorMessage(error.response?.data?.error || "Error creating user");
            console.error("Error creating user:", error);
        }
    };

    return (
        <div>
            <h2>Create User</h2>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            <div>
                <TextField
                    label="Username"
                    variant="outlined"
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <TextField
                    label="Email (optional)"
                    type="email"
                    variant="outlined"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <Button variant="contained" onClick={handleAddUser}>Create User</Button>
        </div>
    );
};

export default CreateUserPage;