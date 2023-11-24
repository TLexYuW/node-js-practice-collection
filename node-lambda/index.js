const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const AthenaExpress = require('athena-express');
const { bigIntHandler } = require('./helpers/helper');


require('dotenv').config()

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.get('/hi', (req, res) => {
    res.send('Hello World!')
})

app.get('/demo', (req, res) => {
    res.send('This is Demo Endpoint')
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

if (process.env.ENVIRONMENT != 'lambda') {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
} else {
    module.exports.handler = serverless(app);
}


