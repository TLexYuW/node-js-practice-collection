const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');

const { mapData } = require('./services/native-athena');

const { wrapper_athena_routes } = require('./controllers/wrapper-sdk-athena-controller');
const { native_athena_routes } = require('./controllers/native-sdk-athena-controller');

// ------------------------------------------------------------------------------------------

require('dotenv').config()

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * fetch("http://localhost:3000/demo").then(res => res.text()).then(data => console.log(data)).catch(err => console.log(err)); 
 */
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'https://www.google.com',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

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
    console.log(req.headers)
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
