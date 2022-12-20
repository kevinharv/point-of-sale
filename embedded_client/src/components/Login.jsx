import { useState } from "react";
import { invoke } from "@tauri-apps/api";


export default function Login() {
    const [password, setPassword] = useState("");

    async function handleLogin() {
        const authRes = await invoke('handle_login', {username: password});
        console.log(authRes);
    }

    return(
        <>
            <label>Enter password: 
                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="submit"
                    onClick={() => handleLogin()}
                >SUBMIT</button>
            </label>
        </>
    );
}