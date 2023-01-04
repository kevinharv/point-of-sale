import { React } from "react";
import { useNavigate } from "react-router-dom";

export default function Template() {
    const navigate = useNavigate();

    return(
        <>
            <button className="m-3 p-2" onClick={() => navigate('/home')}>Home</button>
        </>
    );
}