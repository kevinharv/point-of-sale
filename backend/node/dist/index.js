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
import typeDefs from './graphql/types.js';
import resolvers from './graphql/resolvers.js';
import { initDB, insertDevData, validateDB } from './db/init.js';
// ------------ INITIATE LOGGING SERVICES --------------------
export const logger = winston.createLogger({
    level: 'debug',
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './dist/info.log' }),
    ]
});
logger.info(`Application started on ${os.hostname()} at ${Date.now()}`);
// -------------- CONNECT TO DB -----------------------------
// Create PostgreSQL Database Client
export const pgclient = new pg.Client({
    host: 'postgres',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'pos'
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
await insertDevData();
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
// Modified server startup
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
logger.info(`🚀 Server ready at http://localhost:4000/graphql`);
