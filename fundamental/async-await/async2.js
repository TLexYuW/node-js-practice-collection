const makeApiCall = (time) => {
    /*
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("This API executed in : " + time);
        }, time);
    });
    */

    return () =>
        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("This API executed in : " + time);
            }, time);
        });
};

const apiRequests = [makeApiCall(1000), makeApiCall(2000), makeApiCall(3000), makeApiCall(4000), makeApiCall(500)];

/*
Promise.all(apiRequests)
    .then((values) => {
        console.log(values);
    });
*/


(async function () {
    for (let req of apiRequests) {
        console.log(await req());
    }
})();
