import { pgclient, logger } from "..";
import { faker } from '@faker-js/faker';
export const insertDevData = async () => {
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
        // Insert user into DB
        let query = {
            name: 'Insert User into DB',
            text: "INSERT INTO users(username, password, displayname, fname, mname, lname, birthdate, address, email, clockstatus, lastclockin, lastclockout, roles, permissions) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)",
            values: [user.username, user.userPIN, user.displayName, user.firstName, user.middleName, user.lastName, user.birthdate, user.address, user.email, user.clockStatus, user.lastClockIn, user.lastClockOut, user.roles, user.permissions]
        };
        await pgclient.query(query);
    }
    logger.info("Development Data Inserted into DB");
};
// export default insertDevData;
