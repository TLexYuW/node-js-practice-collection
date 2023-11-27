const promise = new Promise((resolve, reject) => {
    console.log("Async task execution");
    if (true) {
        const person = { name: "YourName" }
        resolve(person)
    } else {
        const error = { errorCode: 11111 };
        reject(error);
    }
})

promise.then(
    (val) => {
        console.log(val)
    },
    // (err) => {
    //     console.log(err)
    // }
).catch(
    (err) => console.log(err)
).finally(() => console.log("Clean up."));