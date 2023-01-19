import { pgclient, logger } from "..";

// Example query
const query = {
    // give the query a unique name
    name: 'fetch-user',
    text: 'SELECT * FROM user WHERE id = $1',
    values: [1],
}
// let result = await pgclient.query(query);

// Check if DB created
// Check if tables are created

// Create missing DBs, tables
// Insert devData if in dev mode

export function initDB() {

}


function validateDB(): boolean {
    const query = {
        
    }
}