import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    username: { type: String, require: true },
    email: { type: String, require: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    }
})