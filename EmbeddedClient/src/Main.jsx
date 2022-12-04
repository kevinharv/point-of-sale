import React from "react";
import { useState } from "react";

export default function Main() {
    const [item, setItem] = useState(1);
    return(
        <>
            <h1>TESTING {item}</h1>
        </>
    );
}