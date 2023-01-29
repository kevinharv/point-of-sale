/*
    TITLE: POS Application Backend Server
    AUTHOR: Kevin Harvey
    DATE: January 2023
    DESCRIPTION: NodeJS/Express/Apollo Server exposes GrapQL endpoints and handles all functions related to the POS system. Database interaction
    and all system functions are handled by this server.
*/
// Server and Package Imports
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import winston from 'winston';
import os from 'os';
import pg from 'pg';
// GQL Imports
import typeDefs from './graphql/types.js';
import resolvers from './graphql/resolvers.js';
// Handlers, Extra Functions, etc. Imports
import { initDB, validateDB } from './db/init.js';
// ------------ INITIATE LOGGING SERVICES --------------------
let logLevel = 'error';
if (process.env.NODE_ENV == "development") {
    logLevel = 'debug';
}
export const logger = winston.createLogger({
    level: logLevel,
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './dist/info.log' }),
    ]
});
logger.info(`Application started on ${os.hostname()} at ${Date.now()}`);
// -------------- CONNECT TO DB -----------------------------
// Create PostgreSQL Database Client
export const pgclient = new pg.Client({
    host: process.env.DB_HOST || 'postgres',
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DB || 'pos'
});
// Connect to the Database
pgclient.connect((err) => {
    if (err) {
        logger.error('Database Connection Error: ', err.stack);
    }
    else {
        logger.info('Database Connection Established!');
    }
});
await initDB();
let res = await validateDB();
if (!res) {
    logger.warn("Database Check Failed");
}
// Create web server
const app = express();
// Creation of HTTP server allows drain on shutdown
const httpServer = http.createServer(app);
//  -------------------- CORE GRAPHQL CODE ----------------------------------------------
const schema = makeExecutableSchema({ typeDefs, resolvers });
// --------------------------------- SERVER CREATION CODE -----------------------------
const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
// Ensure we wait for our server to start
await server.start();
// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
}));
// GraphQL Server Start
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
logger.info(`🚀 Server ready at http://localhost:4000/graphql`);
