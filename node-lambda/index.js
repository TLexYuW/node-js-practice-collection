const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');

const { getQueryExecutionId, checkQueryExequtionState,
    getDataFromAthena, checkQueryExecutionStateAndGetData,
    getQueryResults, mapData, } = require('./services/native-athena');

const { wrapper_athena_routes } = require('./controllers/wrapper-sdk-athena-controller');
const { native_athena_routes } = require('./controllers/native-sdk-athena-controller');

// ------------------------------------------------------------------------------------------

require('dotenv').config()

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ------------------------------------------------------------------------------------------

if (process.env.ENVIRONMENT != 'lambda') {
    app.listen(port, () => {
        console.log(`Demo app listening on port ${port}`)
    })
} else {
    module.exports.handler = serverless(app);
}

// --------------------------------------------------------------------------------------------

app.get('/demo', (req, res) => {
    res.send('Hello World!')
})

app.get('/function/mapdata', async (req, res) => {
    try {
        const result = mapData(req.body);

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
})

// ---------------------------------------------------------------------------------------

app.use('/wrapper-sdk', wrapper_athena_routes);

// ---------------------------------------------------------------------------------------

app.use('/native-sdk', native_athena_routes);
