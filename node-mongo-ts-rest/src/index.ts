import express from 'express';
import http from "http";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';


const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
    console.log("Hello Node!");
    console.log("Server running on 8080");
});


const MONGO_URL = "mongodb://localhost:27017/local"

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('err', (error: Error) => console.log(error));
