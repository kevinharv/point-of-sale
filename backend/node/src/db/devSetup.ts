import { pgclient, logger } from "../index.js";
import { getPasswordHash } from "../handlers/authentication.js";
import { faker } from '@faker-js/faker';

export async function insertDevData() {
    if (await userDataPresent()) {
        return;
    }

    let clockIn = faker.date.between('2020-01-01T00:00:00.000Z', '2020-01-01T12:00:00.000Z');
    let clockOut = faker.date.between('2020-01-01T12:00:01.000Z', '2020-01-01T23:59:59.000Z');
    const testUser: User = {
        username: "kevharv",
        userPIN: "1234",
        password: getPasswordHash("Testing123"),
        displayName: "Kevin Harvey",
        firstName: "Kevin",
        middleName: "Mitchell",
        lastName: "Harvey",
        birthdate: String(faker.date.birthdate().toISOString()).substring(0, 10) + ' ' + String(faker.date.birthdate().toISOString()).substring(11, 19),
        address: faker.address.streetAddress(),
        email: faker.internet.email(),
        clockStatus: false,
        lastClockIn: String(clockIn.toISOString()).substring(0, 10) + ' ' + String(clockIn.toISOString()).substring(11, 19),
        lastClockOut: String(clockOut.toISOString()).substring(0, 10) + ' ' + String(clockOut.toISOString()).substring(11, 19),
        roles: { "roles": ['waitstaff'] },
        permissions: { "permissions": ['timeclock', 'foodSales', 'drinkSales'] }
    }

    let query: QueryConfig = {
        name: 'Insert User into DB',
        text: "INSERT INTO users(username, password, pospin, displayname, fname, mname, lname, birthdate, address, email, clockstatus, lastclockin, lastclockout, roles, permissions) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)",
        values: [testUser.username, testUser.password, testUser.userPIN, testUser.displayName, testUser.firstName, testUser.middleName, testUser.lastName, testUser.birthdate, testUser.address, testUser.email, testUser.clockStatus, testUser.lastClockIn, testUser.lastClockOut, testUser.roles, testUser.permissions]
    }

    try {
        await pgclient.query(query);
    }
    catch (err) {
        logger.error(err);
        return;
    }

    let user: User;
    let fname: String, lname: String, birthdate: Date;
    // Generate and insert test users
    for (let i = 0; i < 50; i++) {
        // Generate fake user info
        fname = faker.name.firstName();
        lname = faker.name.lastName();
        clockIn = faker.date.between('2020-01-01T00:00:00.000Z', '2020-01-01T12:00:00.000Z');
        clockOut = faker.date.between('2020-01-01T12:00:01.000Z', '2020-01-01T23:59:59.000Z');
        birthdate = faker.date.birthdate();
        user = {
            username: fname[0] + lname,
            password: getPasswordHash(faker.internet.password()),
            userPIN: String(faker.random.numeric(4)),
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
        }

        // Insert user into DB
        let query: QueryConfig = {
            name: 'Insert User into DB',
            text: "INSERT INTO users(username, password, pospin, displayname, fname, mname, lname, birthdate, address, email, clockstatus, lastclockin, lastclockout, roles, permissions) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)",
            values: [user.username, user.password, user.userPIN, user.displayName, user.firstName, user.middleName, user.lastName, user.birthdate, user.address, user.email, user.clockStatus, user.lastClockIn, user.lastClockOut, user.roles, user.permissions]
        }

        try {
            await pgclient.query(query);
        }
        catch (err) {
            logger.error(err);
            return;
        }
    }

    logger.info("Development Data Inserted into DB");
}

async function userDataPresent() {
    let valid = true;
    const query: QueryConfig = {
        name: 'Check for User Data',
        text: "SELECT * FROM users"
    }

    try {
        let res = await pgclient.query(query);
        if (res.rowCount < 5) {
            valid = false;
        }
    }
    catch (err) {
        logger.error(err);
        return;
    }
    return valid;
}