import React from "react";
import { useNavigate } from "react-router-dom";


export default function ProfileManager() {
    const navigate = useNavigate();

    // Server call for all user info


    // tmp user for dev
    const user = {
        "name": "Kevin Marvey",
        "username": "kevharv",
        "employeeID": 325415643,
        "birthdate": "2002/07/03",

        "roles": ["manager", "sales"],
        "permissions": ["change_PIN"],
        "previousLogin": "Friday, July 23, 2022 from FATPOS007",
        "clockStatus": "Clocked In - 17:34",
        "email": "kevin@pos.com",
        "address": "123 Admin St, Austin, TX, 77123"
    }

    function handlePersonalInfoChange() {
        // Popup form and POST to server
    }

    function handleWorkInfoChange() {
        // Popup form and POST to server
    }

    function handlePINChange() {
        // Popup form and POST to server
    }

    return(
    <>
        {/* 
            - Current User Information
                - Name
                - Username
                - EMP ID
                - Birthdate?
                - Roles
                - Permissions?
                - Previous Logins
                - Time Clock Info
                - Email
                - Address

            Actions
            - Edit Personal Info
            - Edit Work Info
            - Change Password (PIN)
        
        */}
        <button className="m-3 p-2" onClick={() => navigate('/home')}>Home</button>

        <div className="border-solid border-2">
            <h2>Name: {user.name}</h2>
            <h2>System Name: {user.username}</h2>
            <h2>Employee ID: {user.employeeID}</h2>
            <h2>Previous Login: {user.previousLogin}</h2>
            <h2>Clock Status: {user.clockStatus}</h2>
            <h2>User Roles:</h2>
            <ul className="list-disc ml-5">
                {user.roles.map(role => <li key={role}>{role}</li>)}
            </ul>
            <h2>User Permissions:</h2>
            <ul className="list-disc ml-5">
                {user.permissions.map(permission => <li key={permission}>{permission}</li>)}
            </ul>
        </div>

        <div className="border-solid border-2">
            <h2>Birthdate: {user.birthdate}</h2>
            <h2>Address: {user.address}</h2>
            <h2>Email: {user.email}</h2>
        </div>

        <div className="border-solid border-2">
            <button className="m-2">Edit Personal Info</button>
            <button className="m-2">Edit Work Info</button>
            <button className="m-2">Change Password (PIN)</button>
        </div>
    </>
    );
}