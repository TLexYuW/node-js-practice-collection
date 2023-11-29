const { AthenaClient, StartQueryExecutionCommand,
    GetQueryExecutionCommand, QueryExecutionState, GetQueryResultsCommand } = require('@aws-sdk/client-athena');

require('dotenv').config()

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
    Database: process.env.DATABASE,
    Catalog: process.env.DATA_CATALOG,
};

const athenaService = new AthenaService(athenaServiceConfig);

/**
 * @param {String} sqlQuery The SQL query string
 * @return {Promise<String>}
 */
async function getQueryExecutionId(sqlQuery) {
    const queryExecutionInput = {
        QueryString: sqlQuery,
        QueryExecutionContext: {
            Database: athenaService.database,
            Catalog: athenaService.catalog,
        },
        WorkGroup: process.env.WORK_GROUP,
    };

    const { QueryExecutionId } = await athenaService.client.send(new StartQueryExecutionCommand(queryExecutionInput));
    console.log("QueryExecutionId = ", QueryExecutionId)

    return QueryExecutionId;
}

/**
 * @param {string} QueryExecutionId Id of a query which we sent to Athena
 * @return {Promise<string>} 
 */
async function checkQueryExequtionState(QueryExecutionId) {
    const command = new GetQueryExecutionCommand({ QueryExecutionId });
    const response = await athenaService.client.send(command);
    const state = response.QueryExecution.Status.State;

    if (state === QueryExecutionState.QUEUED || state === QueryExecutionState.RUNNING) {
        await timeout(1000);
        console.log(state);
        return await checkQueryExequtionState(QueryExecutionId);
    } else if (state === QueryExecutionState.SUCCEEDED) {
        console.log(state);
        return state;
        // return await getQueryResults(QueryExecutionId);
    } else if (state === QueryExecutionState.FAILED) {
        console.log(state);
        throw new Error(`Query failed: ${response.QueryExecution.Status.StateChangeReason}`);
    } else if (state === QueryExecutionState.CANCELLED) {
        console.log(state);
        throw new Error('Query was cancelled');
    }
}


/**
 * Get data from Athena and rerutn it as proper formatted Array of objects
 * @param {String} sqlQuery The SQL query string
 * @return {Promise<Array>} Array of Objects
 */
async function getDataFromAthena(sqlQuery) {
    const queryExecutionInput = {
        QueryString: sqlQuery,
        QueryExecutionContext: {
            Database: athenaService.database,
            Catalog: athenaService.catalog,
        },
        WorkGroup: process.env.WORK_GROUP,
        ResultConfiguration:{
            OutputLocation: process.env.BUCKET
        }
    };

    const { QueryExecutionId } = await athenaService.client.send(new StartQueryExecutionCommand(queryExecutionInput));

    const response = await checkQueryExecutionStateAndGetData(QueryExecutionId);

    return response;
}

/**
 * Check query exeqution state if it's equal "QUEUED" or "RUNNING"
 * then afte 1 second the function call itself again recursively
 * until the state is "SUCCEEDED" and after it we get the data
 * @param {String} QueryExecutionId Id of a query which we sent to Athena
 * @return {Promise<Array>} Array of Objects
 */
async function checkQueryExecutionStateAndGetData(QueryExecutionId) {
    const command = new GetQueryExecutionCommand({ QueryExecutionId });
    const response = await athenaService.client.send(command);
    const state = response.QueryExecution.Status.State;

    if (state === QueryExecutionState.QUEUED || state === QueryExecutionState.RUNNING) {
        // In my case, queries run no faster than 800-900ms, which is why I set a 1000ms timeout
        console.log("State = ", state);
        await timeout(1000);
        return await checkQueryExecutionStateAndGetData(QueryExecutionId);
    } else if (state === QueryExecutionState.SUCCEEDED) {
        console.log("State = ", state);
        return await getQueryResults(QueryExecutionId);
    } else if (state === QueryExecutionState.FAILED) {
        console.log("State = ", state);
        throw new Error(`Query failed: ${response.QueryExecution.Status.StateChangeReason}`);
    } else if (state === QueryExecutionState.CANCELLED) {
        console.log("State = ", state);
        throw new Error('Query was cancelled');
    }
}

/**
 * Get result of query exeqution
 * @param {String} QueryExecutionId Id of a query which we sent to Athena
 * @return {Promise<Array>} Array of Objects
 */
async function getQueryResults(QueryExecutionId) {
    const getQueryResultsCommand = new GetQueryResultsCommand({
        QueryExecutionId,
    });
    const response = await athenaService.client.send(getQueryResultsCommand);

    return mapData(response.ResultSet);
}

/**
 * The function map data returned from Athena as rows of values in the array of key/value objects.
 * @param {import('@aws-sdk/client-athena').ResultSet} data Data of rows returned from Athena
 * @return {Array} Array of Objects
 */
function mapData(data) {
    const mappedData = [];

    const columns = data.Rows[0].Data.map((column) => {
        return column.VarCharValue;
    })

    data.Rows.forEach((item, i) => {
        if (i === 0) {
            return;
        }

        const mappedObject = {};
        item.Data.forEach((value, i) => {
            if (value.VarCharValue) {
                mappedObject[columns[i]] = value.VarCharValue;
            } else {
                mappedObject[columns[i]] = '';
            }
        });

        mappedData.push(mappedObject);
    });

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


module.exports = {
    getQueryExecutionId,
    checkQueryExequtionState,
    getDataFromAthena,
    checkQueryExecutionStateAndGetData,
    getQueryResults,
    mapData,
}