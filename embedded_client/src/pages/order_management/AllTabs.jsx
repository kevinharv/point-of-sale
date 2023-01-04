import { React } from "react";
import { useNavigate } from "react-router-dom";

export default function AllTabs() {
    const navigate = useNavigate();

    return (
        <>
            <button className="m-3 p-2" onClick={() => navigate('/home')}>Home</button>

            <section>
                <h1>All tabs the logged in user has created. Sorted from newest to oldest. Pagination with no maximum value. Can go back all the way in time.</h1>
                
                <h1>FEATURES?</h1>
                <ul>
                    <li>20 items per page (4x5)</li>
                    <li>Entries preview what data? Timestamp, location, items?</li>
                </ul>
            </section>
        </>
    );
}