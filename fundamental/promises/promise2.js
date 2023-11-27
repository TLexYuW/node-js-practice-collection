// let p1 = Promise.resolve("execution is done");
// let p2 = Promise.reject("execution is rejectd");

// p1.then((val) => console.log(val));


function asyncTask() {
    return Promise.resolve();
}

asyncTask().then(() => console.log(your_name));

const your_name = "const test name";