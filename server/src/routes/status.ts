import express from "express";

export const statusRouter = express.Router();

statusRouter.get('/healthcheck', (req, res) => {
    res.sendStatus(200);
})