console.log("Task start");

function asyncTask(cb) {
    console.log("Task start in asyncTask()");
    setTimeout(cb, 0)
    // cb();

}

asyncTask(() => console.log(name));
console.log("Task end");

const name = "const test name";