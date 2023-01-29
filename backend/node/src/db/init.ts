import { pgclient, logger } from "../index.js";
import { insertDevData } from "./devSetup.js";
import { dbschema } from "./schema.js";

export async function initDB() {
    const query: QueryConfig = {
        name: 'Create Users Table',
        text: `CREATE TABLE IF NOT EXISTS users (
                userID serial primary key,
                username varchar(255),
                password varchar(255),
                pospin varchar(255),
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
            )`}

    try {
        await pgclient.query(query);
        logger.info("Users Table Present");
    
    }
    catch (err) {
        logger.error(err);
    }

    if (process.env.NODE_ENV == "development") {
        await insertDevData();
    }
}

export async function validateDB(): Promise<Boolean> {
    let valid = true;
    const rows = dbschema.dbtables;
    const query: QueryConfig = {
        name: 'Validate DB',
        text: "SELECT table_name FROM information_schema.tables WHERE table_schema='public'"
    }

    let res = await pgclient.query(query);
    for (let i = 0; i < res.rowCount; i++) {
        if (res.rows[i].table_name != rows[i]) {
            valid = false;
        }
    }

    return valid;
}