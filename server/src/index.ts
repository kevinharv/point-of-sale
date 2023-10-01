/*
    Point of Sale Server
    
*/

import express from "express";
// import { Prisma, PrismaClient } from "@prisma/client";

const port = 3000;
// const prisma = new PrismaClient();
const app = express();

app.get('/', async (req, res) => {
    res.send("Checking if this works! But a I going to automaically reload?");
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})