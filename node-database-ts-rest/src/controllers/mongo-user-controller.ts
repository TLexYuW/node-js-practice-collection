import express from 'express';
import mongoose from 'mongoose';

import { deleteUserById, getUsers, getUserById } from '../services/mongodb-user-service';

export const mongoUserRoutes = express.Router();

const UserDemoSchema = new mongoose.Schema({
    name: { type: String },
    age: { type: Number }
})

const DemoUserModel = mongoose.model("demo_users", UserDemoSchema);

mongoUserRoutes.get("/demo", (req, res) => {
    DemoUserModel.find()
        .then(data => {
            console.log(data);
            res.json(data);
        })
        .catch(err => console.log(err))
})

mongoUserRoutes.get("/list", async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();

        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});

const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const deletedUser = await deleteUserById(id);

        return res.json(deletedUser);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { username } = req.body;

        if (!username) {
            return res.sendStatus(400);
        }

        const user = await getUserById(id);

        user.username = username;
        await user.save();

        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export { deleteUser, updateUser }