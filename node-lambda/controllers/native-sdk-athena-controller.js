const express = require('express');

const { getQueryExecutionId, checkQueryExequtionState, getDataFromAthena,
    checkQueryExecutionStateAndGetData, getQueryResults, mapData } = require('../services/native-athena');

require('dotenv').config()

const native_athena_routes = express.Router();

native_athena_routes.get('/query-then-get-execution-id', async (req, res) => {
    try {
        const sql = "SHOW TABLES";
        const queryExecutionId = await getQueryExecutionId(sql);

        res.status(200).send(queryExecutionId);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
})

native_athena_routes.get('/check-query-execution-id-state', async (req, res) => {
    try {
        const id = req.query.query_execution_id;

        if (typeof id === 'string') {
            const queryExequtionState = await checkQueryExequtionState(id);
            res.status(200).send(queryExequtionState);
        }

    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
})

native_athena_routes.post('/customer/list', async (req, res) => {
    try {
        const sql = "SELECT customerid, fullname FROM customers LIMIT 10";
        const result = await getDataFromAthena(sql);

        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
})

native_athena_routes.post('/customer/check-state-by-js-sdk/:query_execution_id', async (req, res) => {
    try {
        const result = checkQueryExecutionStateAndGetData(req.params.query_execution_id);

        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
})

native_athena_routes.get('/customer/get-result-by-js-sdk/:query_execution_id', async (req, res) => {
    try {
        const result = getQueryResults(req.params.query_execution_id);

        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
})

module.exports = {
    native_athena_routes
}