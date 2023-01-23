import { pgclient, logger } from "..";
import schema from './schema.json' assert { type: "json" };
import { faker } from '@faker-js/faker';
export async function initDB() {
    const query = {
        name: 'Create Users Table',
        text: `CREATE TABLE IF NOT EXISTS users (
                userID serial primary key,
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
    await pgclient.query(query);
    logger.info("Users Table Created");
}
export async function insertDevData() {
    // Drop all existing users
    let query = {
        name: 'Drop All Users',
        text: 'DELETE FROM users',
    };
    await pgclient.query(query);
    let user;
    let fname, lname, clockIn, clockOut, birthdate;
    // Generate and insert test users
    for (let i = 0; i < 100; i++) {
        // Generate fake user info
        fname = faker.name.firstName();
        lname = faker.name.lastName();
        clockIn = faker.date.between('2020-01-01T00:00:00.000Z', '2020-01-01T12:00:00.000Z');
        clockOut = faker.date.between('2020-01-01T12:00:01.000Z', '2020-01-01T23:59:59.000Z');
        birthdate = faker.date.birthdate();
        user = {
            username: fname[0] + lname,
            userPIN: Number(faker.random.numeric(4)),
            displayName: fname + ' ' + lname,
            firstName: fname,
            middleName: String(faker.name.middleName()),
            lastName: lname,
            birthdate: String(birthdate.toISOString()).substring(0, 10) + ' ' + String(birthdate.toISOString()).substring(11, 19),
            address: faker.address.streetAddress(),
            email: faker.internet.email(),
            clockStatus: false,
            lastClockIn: String(clockIn.toISOString()).substring(0, 10) + ' ' + String(clockIn.toISOString()).substring(11, 19),
            lastClockOut: String(clockOut.toISOString()).substring(0, 10) + ' ' + String(clockOut.toISOString()).substring(11, 19),
            roles: { "roles": ['waitstaff'] },
            permissions: { "permissions": ['timeclock', 'foodSales', 'drinkSales'] }
        };
        // console.log(i);
        // console.log(user.lastClockIn);
        // Insert user into DB
        let query = {
            name: 'Insert User into DB',
            text: "INSERT INTO users(username, password, displayname, fname, mname, lname, birthdate, address, email, clockstatus, lastclockin, lastclockout, roles, permissions) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)",
            values: [user.username, user.userPIN, user.displayName, user.firstName, user.middleName, user.lastName, user.birthdate, user.address, user.email, user.clockStatus, user.lastClockIn, user.lastClockOut, user.roles, user.permissions]
        };
        // console.log(query);
        await pgclient.query(query);
    }
    logger.info("Development Data Inserted into DB");
}
export async function validateDB() {
    let valid = true;
    const rows = schema.dbtables;
    const query = {
        name: 'Validate DB',
        text: "SELECT table_name FROM information_schema.tables WHERE table_schema='public'"
    };
    let res = await pgclient.query(query);
    for (let i = 0; i < res.rowCount; i++) {
        if (res.rows[i].table_name != rows[i]) {
            valid = false;
        }
    }
    return valid;
}
