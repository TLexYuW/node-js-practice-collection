let p1 = Promise.resolve("execution 1");
// let p2 = Promise.reject("execution is rejectd");

p1
    .then((val) => {
        console.log(val)
        return "exectunio 2"
    })
    .then((val) => {
        console.log(val)
        return "exectunio 3"
    })
    .then((val) => {
        console.log(val)
    })
    .catch((err) => console.log(err));

