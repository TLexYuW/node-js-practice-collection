const express = require('express');

const { athenaExpress } = require('../services/wrapper-athena');
const { bigIntHandler } = require('../utils/common-utils');

require('dotenv').config()

const wrapper_athena_routes = express.Router();

wrapper_athena_routes.get('/database/list', async (req, res) => {
    try {
        const results = await athenaExpress.query("SHOW DATABASES");
        console.log(results)

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }

})

wrapper_athena_routes.get('/table/list', async (req, res) => {
    try {
        let query = {
            sql: "SHOW TABLES",
            db: "demo_data"
        }
        const results = await athenaExpress.query(query);
        console.log(results)

        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }

})

wrapper_athena_routes.get('/customer/get/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await athenaExpress.query(`SELECT * FROM demo_data.customers where customerid = ${id};`)

        res.status(200).json(JSON.parse(bigIntHandler(result)));
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
})

wrapper_athena_routes.post('/sql-query', async (req, res) => {
    try {
        let query = {
            sql: req.body.sql,
            db: req.body.db
        }
        const result = await athenaExpress.query(query)

        res.status(200).json(JSON.parse(bigIntHandler(result)));
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
})


module.exports = {
    wrapper_athena_routes
}