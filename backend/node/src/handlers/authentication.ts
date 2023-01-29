import { pgclient, logger } from "../index.js";
import bcrypt from "bcrypt";

// Cryptography constants
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

export async function handlePINAuth(PIN: string): Promise<String> {
    const query: QueryConfig = {
        text: "SELECT userid FROM users WHERE pospin=$1",
        values: [PIN]
    }
    const res = await pgclient.query(query);

    if (res.rowCount > 1) {
        logger.error(`Duplicate PIN: ${PIN}`);
    }
    else if (res.rowCount == 1) {
        return JSON.stringify(res.rows[0].userid);
    }
    else {
        return "-1";
    }

}



export function getPasswordHash(password: string): string {
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}