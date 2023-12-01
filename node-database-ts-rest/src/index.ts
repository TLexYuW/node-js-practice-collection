import express from 'express';
import http from "http";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import { demoRoutes } from './controllers/demo-controller';
import { userRoutes } from './controllers/user-controller';
import { employeeRoutes } from './controllers/employee-controller';
import { authRoutes } from './controllers/auth-controller';
import { mongoUserRoutes } from './controllers/mongo-user-controller';

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
    console.log("Server running on 8080");
});


const MONGO_URL = 'mongodb://127.0.0.1:27017/test_db'

mongoose.connect(MONGO_URL)
    .then(() => console.log('MongoDB Connection Successfully!'))
    .catch(err => console.log(err))
mongoose.Promise = global.Promise;
mongoose.connection.on('err', (error: Error) => console.log(error));


app.use('/demo', demoRoutes);

app.use('/user', userRoutes);

app.use('/employee', employeeRoutes);

app.use('/mongo/auth', authRoutes)

app.use('/mongo/users', mongoUserRoutes)
