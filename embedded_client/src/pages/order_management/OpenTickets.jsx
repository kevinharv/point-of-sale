import { React } from "react";
import { useNavigate } from "react-router-dom";

export default function OpenTickets() {
    const navigate = useNavigate();

    return (
        <>
            <button className="m-3 p-2" onClick={() => navigate('/home')}>Home</button>

            <section>
                <h1>All open tabs created by user. Sorted from newest to oldest. Pagination with no maximum value.</h1>

                <h1>FEATURES?</h1>
                <ul>
                    <li>20 items per page (4x5)</li>
                    <li>Entries preview what data? Timestamp, location, items?</li>
                </ul>
            </section>
        </>
    );
}