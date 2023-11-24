const { time } = require('console');
const express = require('express');
const { Worker } = require('worker_threads');
const { performance } = require('perf_hooks');


const app = express();
const port = 3000;


app.get("/non-blocking/", (req, res) => {
    res.status(200).send("This page is non-blocking")
});

app.get("/blocking/", async (req, res) => {
    // /*
    const start = performance.now()

    const worker = new Worker("./worker.js");

    worker.on("message", (data) => {

        const end = performance.now();
        console.log(`Execution time: ${(end - start) / 1_000} seconds`);

        res.status(200).send(`result is ${data}`);
    })

    worker.on("err", (err) => {
        console.log(err);
        res.status(404).send(`An error occured`);
    })
    // */

    /*
    let counter = 0;
    for (let i = 0; i < 20_000_000_000; i++) {
        counter++;
    }
    res.status(200).send(`result is ${counter}`);
    */
});


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})