import express from 'express';
import http from "http";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
// import 'express-async-errors';
import { demoRoutes } from './controllers/demo-controller';
import { userRoutes } from './controllers/user-controller';
import { employeeRoutes } from './controllers/employee-controller';

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

app.use('/demo', demoRoutes);

app.use('/user', userRoutes);

app.use('/employee', employeeRoutes);

// app.use((err: Error, req: any, res: any, next: any) => {
//     console.log(err);
//     res.status(500).send("Something went wrong!");
// })


