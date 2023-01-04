import { useState } from "react";
import Login from '../components/Login';
import '../styles/Home.css';
import Cookies from 'universal-cookie';
import { useNavigate, useNavigationType } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    const cookies = new Cookies();
    let roles = cookies.get("roles");

    // Server call or config check to determine what buttons should be shown

    let btnConfig = {
        "manager": true,
        "activeSales": true,
        "newSales": true,
        "profile": true,
        "alcohol": true,
        "deviceConfig": true,
    }

    return (
        <>
            <h1 className="text-6xl">Home Page</h1>
            <h2 className="text-4xl">Hello, {cookies.get("name")}</h2>
            <h3>Roles:</h3>
            <ul className="list-disc ml-5">
                {roles.map(role => <li key={role}>{role}</li>)}
            </ul>



            <div className="actionSelect">
                {btnConfig.profile && <button onClick={() => navigate('/profile')}>Profile</button>}
                {btnConfig.manager && <button>Manager Actions</button>}
                {btnConfig.deviceConfig && <button>Device Configuration</button>}

                {/* Main Actions */}
                {btnConfig.activeSales && <button onClick={() => navigate('/sales/all-tabs')}>All Tabs</button>}
                {btnConfig.activeSales && <button onClick={() => navigate('/sales/open-tabs')}>Open Tabs</button>}
                {btnConfig.newSales && <button onClick={() => navigate('/sales/table-tab')}>Start Order</button>}
                {btnConfig.alcohol && <button onClick={() => navigate('/sales/bar-tab')}>Start Bar Tab</button>}
            </div>
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