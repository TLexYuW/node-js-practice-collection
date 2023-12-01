import express from 'express';

export const demoRoutes = express.Router();

demoRoutes.get('/', async (req, res) => {
    res.status(200).send("Hello World!")
})
