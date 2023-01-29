import { pgclient, logger } from "../index.js";
import bcrypt from "bcrypt";
import jsonwebtoken from 'jsonwebtoken';

// Cryptography constants
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const secret = process.env.TOKEN_SECRET || '09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611';

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
        return await generateAccessToken(Number(JSON.stringify(res.rows[0].userid)));
    }
    else {
        return null;
    }
}

export function getPasswordHash(password: string): string {
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

export async function generateAccessToken(userid: Number): Promise<string> {
    return jsonwebtoken.sign({userid}, secret, { expiresIn: '30s' });
}

export async function userTokenAuth(token: string): Promise<User> {
    let id: Number;
    jsonwebtoken.verify(token, secret, (err: any, userid: any) => {
        if (err) return null;
        id = userid.userid;
    });
    
    const query: QueryConfig = {
        text: "SELECT * FROM users WHERE userid=$1",
        values: [id]
    }
    const res = await pgclient.query(query);

    if (res.rowCount > 0) {
        const dbuser = res.rows[0];
        const user: User = {
            userID: Number(dbuser.userid),
            username: dbuser.username,
            displayName: dbuser.displayname,
            firstName: dbuser.fname,
            middleName: dbuser.mname,
            lastName: dbuser.lname,
            birthdate: dbuser.birthdate,
            address: dbuser.address,
            email: dbuser.email,
            clockStatus: dbuser.clockstatus,
            lastClockIn: dbuser.lastclockin,
            lastClockOut: dbuser.lastclockout,
            roles: [JSON.stringify(dbuser.roles)],
            permissions: [JSON.stringify(dbuser.permissions)]
        }
        return user;
    }
    else {
        return null;
    }
}
