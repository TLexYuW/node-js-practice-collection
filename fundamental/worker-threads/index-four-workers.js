const { time } = require('console');
const express = require('express');
const { Worker } = require('worker_threads');
const { performance } = require('perf_hooks');


const app = express();
const port = 3000;
const THREAD_COUNT = 4;

function createWorker() {
    return new Promise((resolve, reject) => {

        const worker = new Worker("./four-workers.js", {
            workerData: { thread_count: THREAD_COUNT }
        })

        worker.on("message", (data) => {
            resolve(data);
        })

        worker.on("err", (err) => {
            console.log(err);
            reject(`An error occured`)
        })
    })
}

app.get("/non-blocking/", (req, res) => {
    res.status(200).send("This page is non-blocking")
});

app.get("/blocking/", async (req, res) => {
    const start = performance.now()

    const workerPromises = []
    for (let i = 0; i < THREAD_COUNT; i++) {
        workerPromises.push(createWorker());
    }

    const thread_result = await Promise.all(workerPromises);
    // const total = thread_result[0] + thread_result[1] + thread_result[2] + thread_result[3]
    const total = thread_result.reduce((accumulator, current) => accumulator + current, 0);

    const end = performance.now();
    console.log(`Execution time: ${(end - start) / 1_000} seconds`);
    res.status(200).send(`result is ${total}`);
});


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})