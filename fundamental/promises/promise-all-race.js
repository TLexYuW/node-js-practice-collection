const makeApiCall = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("This API executed in : " + time);
        }, time);
    });
}

let makeMultiApiCall = [makeApiCall(1000), makeApiCall(2000), makeApiCall(3000), makeApiCall(4000), makeApiCall(500)];

Promise.all(makeMultiApiCall)
    .then((values) => {
        console.log(values);
    });

Promise.race(makeMultiApiCall).then((val) => {
    console.log(val);
    console.log("----------------------------------------------------")
});
