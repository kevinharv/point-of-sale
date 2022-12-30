import { useState } from "react";
import { invoke } from "@tauri-apps/api";
import tenant from '../config/tenant.json'
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [PIN, setPIN] = useState("");

    function handleLogin() {
        alert(PIN);
        setPIN("");

        /*
            - Send PIN to server
            - Get back user info, or invalid
                - Error on invalid login
            - Store user information returned by server
            - Navigate to main menu
        */
       navigate('home');
    }

    return (
        <>
            <div className="grid h-screen grid-cols-1 place-items-center">
                <div className="grid grid-cols-3 gap-4 place-items-center">
                    <button onClick={() => setPIN(PIN + "1")}>1</button>
                    <button onClick={() => setPIN(PIN + "2")}>2</button>
                    <button onClick={() => setPIN(PIN + "3")}>3</button>
                    <button onClick={() => setPIN(PIN + "4")}>4</button>
                    <button onClick={() => setPIN(PIN + "5")}>5</button>
                    <button onClick={() => setPIN(PIN + "6")}>6</button>
                    <button onClick={() => setPIN(PIN + "7")}>7</button>
                    <button onClick={() => setPIN(PIN + "8")}>8</button>
                    <button onClick={() => setPIN(PIN + "9")}>9</button>
                    <button onClick={() => setPIN("")}>X</button>
                    <button onClick={() => setPIN(PIN + "0")}>0</button>
                    <button onClick={() => handleLogin()}>Y</button>
                </div>
            </div>
        </>
    );
}