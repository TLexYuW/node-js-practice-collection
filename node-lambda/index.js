const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const AthenaExpress = require('athena-express');


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


app.post('/athena', async (req, res) => {
    try {
        const result = await athenaExpress.query("SELECT * FROM test_db.test_data limit 10;")
        
        const resultStringified = JSON.stringify(result, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        );

        res.json(JSON.parse(resultStringified));
    } catch (error) {
        console.error('Error executing Athena query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })


module.exports.handler = serverless(app);
