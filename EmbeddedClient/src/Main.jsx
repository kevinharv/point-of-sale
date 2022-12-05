/*
This is the main entry component for the application. All initialization and configuration activities should take place here or in the
preload.js file before application load.

*/

import React from "react";
import { useState } from "react";
import Authentication from "./components/Authentication.jsx";
import './index.css';
import config from './config/config.json';

export default function Main() {
    const [item, setItem] = useState(1);
    return(
        <>
            <h1>{config.tenant.name}</h1>
            <h1 className="test">Test {item}</h1>
            <button onClick={() => setItem(item + 1)}>CLICK ME</button>

            <Authentication />
        </>
    );
}