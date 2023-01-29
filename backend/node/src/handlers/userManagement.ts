import { pgclient, logger } from "../index.js";

export async function getUser(userID: string): Promise<User> {
    const query: QueryConfig = {
        text: "SELECT * FROM users WHERE userid=$1",
        values: [userID]
    }
    const res = await pgclient.query(query);

    if (res.rowCount > 0) {
        const dbuser = res.rows[0];
        const user: User = {
            userID: Number(userID),
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