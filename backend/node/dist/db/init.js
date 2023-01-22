import { pgclient, logger } from "..";
// let result = await pgclient.query(query);
// Check if DB created
// Check if tables are created
// Create missing DBs, tables
// Insert devData if in dev mode
export function initDB() {
    const query = {
        name: 'Create Users Table',
        text: `CREATE TABLE IF NOT EXISTS users (
                userID uuid,
                username varchar(255),
                password varchar(255),
                displayName varchar(511),
                fname varchar(255),
                mname varchar(255),
                lname varchar(255),
                birthdate date,
                address varchar(511),
                email varchar(255),
                clockStatus bool,
                lastClockIn timestamp,
                lastClockOut timestamp,
                roles json,
                permissions json
            )`
    };
    let res = pgclient.query(query);
    logger.info(res);
}
export async function insertDevData() {
    const query = {
        name: 'Insert Dev Data',
        text: 'INSERT INTO users(username, displayName) VALUES($1, $2)',
        values: ['kharvey', 'Kevin Harvey']
    };
    let result = await pgclient.query(query);
    logger.info(result.rows);
}
// export function validateDB(): boolean {
//     const query = {
//     }
//     return false;
// }
