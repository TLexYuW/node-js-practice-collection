const express = require('express');
const mongoose = require('mongoose');

const app = express()
const PORT = 8080

mongoose.connect('mongodb://127.0.0.1:27017/test_db')
    .then(() => console.log('MongoDB Connection Successfully!'))
    .catch(err => console.log(err))
mongoose.Promise = global.Promise;
mongoose.connection.on('err', (error) => console.log(error));

const UserSchema = new mongoose.Schema({
    name: String,
    age: Number
})

const UserModel = mongoose.model("demo_users", UserSchema);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

app.get("/users", (req, res) => {
    UserModel.find({})
        .then(data => res.json(data))
        .catch(err => console.log(err))
})