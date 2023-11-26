import express from 'express';
import { ResultSetHeader } from 'mysql2';
import { mysqlpool } from '../db/mysql/db';
import { getAllUsers, getUserById, deleteUserById } from '../services/user-service';


export const userRoutes = express.Router();

userRoutes.get('/', async (req, res) => {
        /*
        const rows = await mysqlpool
                .query("SELECT * FROM user")
                .then(data => res.send(data))
                .catch(err => console.log(err))
        if (rows && Array.isArray(rows)) {
                console.log("Rows = " + rows.length);
        }
        */

        const users = await getAllUsers().catch(err => res.status(400).json(err.message));
        res.status(200).json(users);
})

userRoutes.get('/:id', async (req, res) => {

        const user: any = await getUserById(req.params.id).catch(err => res.status(400).json(err.message));
        if (user.length == 0) {
                res.status(404).json('no record with given id : ' + req.params.id);
        } else {
                res.status(200).send(user);
        }

})


userRoutes.delete('/:id', async (req, res) => {

        const affectedRows = await deleteUserById(req.params.id).catch(err => res.status(400).json(err.message));
        if (affectedRows == 0) {
                res.status(404).json('no record with given id : ' + req.params.id);
        } else {
                res.status(200).send('Deleted Successfully');
        }

})

userRoutes.get('/count', async (req, res) => {
        await mysqlpool
                .query("SELECT COUNT(*) FROM user")
                .then(data => res.send(data[0]))
                .catch(err => console.log(err))
})