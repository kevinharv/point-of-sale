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
        systemAuth(source, args) {
            return handlePINAuth(args.userPIN);
        },
        user: (source, args) => {
            console.log(args);
            return String(args.userID);
        },
        profile: (args) => {
            return String(args.userID);
        },
        sysInfo() {
            return getSysInfo();
        }
    },
    Mutation: {
        updateUser: (args) => {
            return String(args.userID);
        }
    },
};
export default resolvers;
/* --------------- FUNCTIONAL HANDLERS ------------------- */
function handlePINAuth(PIN) {
    let statusCode;
    // Query PIN against DB
    // Get user
    if (PIN == 1234) {
        statusCode = "200 OK";
        logger.info('User Authenticated');
    }
    else {
        statusCode = "403 Forbidden";
    }
    return statusCode;
}
async function getSysInfo() {
    let systemInfo = {
        server_hostname: os.hostname(),
        server_uptime: os.uptime(),
        server_arch: os.arch(),
        server_os: os.platform(),
        server_os_release: os.release(),
        server_cpu: JSON.stringify(os.cpus()),
        server_memory: os.totalmem() / 1048576,
        server_availableMem: os.freemem() / 1048576,
        server_NICs: JSON.stringify(os.networkInterfaces()),
        dns_servers: JSON.stringify(dns.getServers()),
        postgres_version: "",
    };
    const query = {
        name: 'get-info',
        text: 'SELECT version()',
    };
    let result = await pgclient.query(query);
    systemInfo.postgres_version = JSON.stringify(result.rows);
    logger.debug(systemInfo);
    return systemInfo;
}
