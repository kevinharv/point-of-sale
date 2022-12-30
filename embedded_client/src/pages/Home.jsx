import { useState } from "react";
import Login from '../components/Login';
import '../styles/Home.css';

export default function Home() {



    return (
        <>
            <h1 className="text-6xl">Home Page</h1>
            <h2 className="text-4xl">Hello, {localStorage.getItem("username")}</h2>
        </>
    );
}


/*
DESIGN
- Profile Manager
- Manager Options (if manager role)
- Sales Manager (if sales role)
- Open Tickets
- Start Table Tab
- Start Bar Tab

*/