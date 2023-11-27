
function asyncTask(cb) {
    setTimeout(() => {
        // cb("Error!")
        cb(null, "This is data from server!")
    }, 0)
}

asyncTask((err, data) => {
    if (err) {
        throw Error("Errrrrrrrrrrrrrrr");
    } else {
        console.log("data = ", data)
    }
});
