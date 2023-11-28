const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const AthenaExpress = require('athena-express');
const { bigIntHandler } = require('./helpers/helper');
const { AthenaClient, StartQueryExecutionCommand,
    GetQueryExecutionCommand, QueryExecutionState, GetQueryResultsCommand } = require('@aws-sdk/client-athena');
const { it } = require('node:test');


// ------------------------------------------------------------------------------------------

require('dotenv').config()

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ------------------------------------------------------------------------------------------

class AthenaService {
    constructor(config) {
        this.client = new AthenaClient(config.ClientConfig);
        this.database = config.Database;
        this.catalog = config.Catalog;
    }
}

const athenaClientConfig = {
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.ACCESSKEYID,
        secretAccessKey: process.env.SECRETACCESSKEY,
    },
}

const athenaServiceConfig = {
    ClientConfig: athenaClientConfig,
    Database: "demo_data",
    Catalog: process.env.DATA_CATALOG,
};

const athenaService = new AthenaService(athenaServiceConfig);

// ------------------------------------------------------------------------------------------

const awsCredentials = {
    region: process.env.REGION,
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
};
AWS.config.update(awsCredentials);

const athenaExpressConfig = {
    aws: AWS,
    s3: process.env.BUCKET,
    getStats: true,
};
const athenaExpress = new AthenaExpress(athenaExpressConfig);

// --------------------------------------------------------------------------------------------

if (process.env.ENVIRONMENT != 'lambda') {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
} else {
    module.exports.handler = serverless(app);
}

// --------------------------------------------------------------------------------------------

app.get('/demo', (req, res) => {
    res.send('Hello World!')
})

app.get('/database/list', async (req, res) => {
    try {
        const results = await athenaExpress.query("SHOW DATABASES");
        console.log(results)

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }

})

app.get('/table/list', async (req, res) => {
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

app.get('/customer/get', async (req, res) => {
    try {
        const id = req.query.id;
        const result = await athenaExpress.query(`SELECT * FROM demo_data.customers where customerid = ${id};`)

        res.status(200).json(JSON.parse(bigIntHandler(result)));
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
})

// ---------------------------------------------------------------------------------------

app.get('/customer/query-by-js-sdk', async (req, res) => {
    try {
        const sql = "SHOW TABLES";
        const result = await getDataFromAthena(sql);

        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
})

app.get('/customer/check-state-by-js-sdk/:query_execution_id', async (req, res) => {
    try {
        const result = checkQueryExequtionStateAndGetData(req.params.query_execution_id);

        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
})

app.get('/customer/get-result-by-js-sdk/:query_execution_id', async (req, res) => {
    try {
        const result = getQueryResults(req.params.query_execution_id);

        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
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

/**
 * Get data from Athena and rerutn it as proper formatted Array of objects
 * @param {String} sqlQuery The SQL query string
 * @return {Array} Array of Objects
 */
async function getDataFromAthena(sqlQuery) {
    const queryExecutionInput = {
        QueryString: sqlQuery,
        QueryExecutionContext: {
            Database: athenaService.database,
            Catalog: athenaService.catalog,
        },
        WorkGroup: 'test-workgroup',
    };

    const { QueryExecutionId } = await athenaService.client.send(new StartQueryExecutionCommand(queryExecutionInput));
    console.log("QueryExecutionId = ", QueryExecutionId)

    // return QueryExecutionId;
    const response = await checkQueryExequtionStateAndGetData(QueryExecutionId);

    // console.log("Response = ", response);

    return response;
}

/**
 * Check query exeqution state if it's equal "QUEUED" or "RUNNING"
 * then afte 1 second the function call itself again recursively
 * until the state is "SUCCEEDED" and after it we get the data
 * @param {String} QueryExecutionId Id of a query which we sent to Athena
 * @return {Array} Array of Objects
 */
async function checkQueryExequtionStateAndGetData(QueryExecutionId) {
    const command = new GetQueryExecutionCommand({ QueryExecutionId });
    const response = await athenaService.client.send(command);
    const state = response.QueryExecution.Status.State;

    if (state === QueryExecutionState.QUEUED || state === QueryExecutionState.RUNNING) {
        // In my case, queries run no faster than 800-900ms, which is why I set a 1000ms timeout
        await timeout(1000);
        return await checkQueryExequtionStateAndGetData(QueryExecutionId);
    } else if (state === QueryExecutionState.SUCCEEDED) {
        return await getQueryResults(QueryExecutionId);
    } else if (state === QueryExecutionState.FAILED) {
        throw new Error(`Query failed: ${response.QueryExecution.Status.StateChangeReason}`);
    } else if (state === QueryExecutionState.CANCELLED) {
        throw new Error('Query was cancelled');
    }
}

/**
 * Get result of query exeqution
 * @param {String} QueryExecutionId Id of a query which we sent to Athena
 * @return {Array} Array of Objects
 */
async function getQueryResults(QueryExecutionId) {
    const getQueryResultsCommand = new GetQueryResultsCommand({
        QueryExecutionId,
    });
    const response = await athenaService.client.send(getQueryResultsCommand);

    console.log("Response From getQueryResults =  ", response);
    response.ResultSet.ResultSetMetadata.ColumnInfo.forEach(e => console.log(e))
    response.ResultSet.Rows.forEach(e => console.log(e))
    return mapData(response.ResultSet);
}

/**
 * The function map data returned from Athena as rows of values in the array of key/value objects.
 * @param {Array} data Data of rows returned from Athena
 * @return {Array} Array of Objects
 */
function mapData(data) {
    const mappedData = [];
    console.log("mapData data = ", data);
    console.log("data.Rows[0].Data = ", data.Rows[0].Data);

    const columns = data.Rows.forEach((columns) => {
        console.log("data row = ", columns);
        return columns;
    })
    console.log("columns = ", columns);

    // /*
    data.Rows.forEach((item, i) => {
        console.log("item = ", item);
        console.log("i = ", i);
        if (Array.isArray(item.Data)) {
            console.log("item Data length = ", item.Data.length);
            if (item.Data.length === 0) {
                return;
            }
        }

        let mappedObject = null;
        item.Data.forEach((value) => {
            console.log("Data value = ", value)
            console.log("Data i = ", i)
            if (value.VarCharValue) {
                console.log("value.VarCharValue = ", value.VarCharValue)
                mappedObject = value.VarCharValue;
            } else {
                mappedObject = '';
            }
        });

        mappedData.push(mappedObject);
    });
    // */

    console.log(mappedData)

    return mappedData;
}

/**
 * Simple helper timeout function uses in checkQueryExequtionStateAndGetData function
 * @param {number} msTime Time in miliseconds
 * @return {Promise} Promise
 */
function timeout(msTime) {
    return new Promise((resolve) => setTimeout(resolve, msTime));
}