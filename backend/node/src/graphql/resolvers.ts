/*
    TITLE: POS Backend Server GraphQL Resolvers
    AUTHOR: Kevin Harvey
    DATE: 20220118
    OVERVIEW: The GraphQL Resolvers are responsible for finding and returning the appropriate information for each query, mutation, or subscription.
    Most actions in this file are calls to other functions or APIs responsible for fulfilling the actual request. This is remove excess code from
    this file and ensure separation of concerns.
*/

import { logger, pgclient } from '../index.js';
import dns from 'dns';
import os from 'os';

/* --------------- RESOLVERS DEFINITIONS ------------------- */
const resolvers = {
    Query: {
        systemAuth(source, args: any) {
            return handlePINAuth(args.userPIN);
        },

        user: (source, args) => {
            console.log(args)
            return String(args.userID);
        },
        profile: (args: any) => {
            return String(args.userID);
        },
        sysInfo() {
            return getSysInfo();
        }
    },

    Mutation: {
        updateUser: (args: any) => {
            return String(args.userID);
        },
        addUser: (source, args) => {
            return String(addUser(args.user));
        }
    },
}

export default resolvers

/* --------------- FUNCTIONAL HANDLERS ------------------- */


async function addUser(args): Promise<String> {
    const query = {
        name: 'Insert New User',
        text: 'INSERT INTO users(username, password, displayname, fname, mname, lname, email) VALUES($1, $2, $3, $4, $5, $6, $7)',
        values: [args.username, args.userPIN, args.displayName, args.firstName, args.middleName, args.lastName, args.email]
    }

    const res = await pgclient.query(query);
    return JSON.stringify(res.rows);
}

async function handlePINAuth(PIN: number) {
    const query = {
        name: 'Validate Passowrd',
        text: 'SELECT username FROM users WHERE password=$1',
        values: [PIN]
    }
    let res = await pgclient.query(query);
    return res.rows[0].username;
}

async function getSysInfo() {

    let systemInfo: System = {
        server_hostname: os.hostname(),
        server_uptime: os.uptime(),
        server_arch: os.arch(),
        server_os: os.platform(),
        server_os_release: os.release(),
        server_cpu: JSON.stringify(os.cpus()),
        server_memory: os.totalmem() / 1048576,                 // Server Memory in MB
        server_availableMem: os.freemem() / 1048576,            // Free Memory in MB
        server_NICs: JSON.stringify(os.networkInterfaces()),
        dns_servers: JSON.stringify(dns.getServers()),

        postgres_version: "",
    }

    const query = {
        name: 'get-info',
        text: 'SELECT version()',
    };

    let result = await pgclient.query(query);
    systemInfo.postgres_version = JSON.stringify(result.rows);

    logger.debug(systemInfo);
    return systemInfo;
}