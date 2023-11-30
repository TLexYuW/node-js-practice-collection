const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUI = require("swagger-ui-express");
const bodyParser = require('body-parser');
const cors = require("cors");
const morgan = require("morgan");
const lowdb = require("lowdb");
const { routes } = require("./router/book");

const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = lowdb(adapter)

db.defaults({ book: [] }).write();

const option = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Library API",
            version: "1.0.0",
            description: "A Simple Express API"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ],
    },
    apis: ["./router/*.js"]
}

const specs = swaggerJsDoc(option);

const app = express();
const port = 3000

app.db = db;
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.listen(port, () => {
    console.log(`Demo app listening on port ${port}`);
});

app.get("/demo", ((req, res) => {
    res.status(200).send("Demo Endpoint Response!");
}))

app.use("/books", routes);