import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, require: true },
    email: { type: String, require: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    },
});

const UserModel = mongoose.model("users", UserSchema);

const getUsers = () => UserModel.find();
const getUserByEmail = (email: String) => UserModel.findOne({ email });
const getUserBySessionToken = (sessionToken: String) => UserModel.findOne({ 'authentication.sessionToken': sessionToken });
const getUserById = (id: String) => UserModel.findById(id);
const createUser = (values: Record<string, any>) => new UserModel(values).save().then(user => user.toObject);
const deleteUserById = (id: String) => UserModel.findOneAndDelete({ _id: id });
const updateUserById = (id: String, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);

export { getUsers, getUserByEmail, getUserBySessionToken, getUserById, createUser, deleteUserById, updateUserById }