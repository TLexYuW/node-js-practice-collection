console.log("Start Operation");

function sleep(milliseconds) {
    let startTime = new Date().getTime();
    console.log("operation is running");
    while (new Date().getTime() < startTime + milliseconds) {
        console.log("In progress");
    }
    console.log("Operation is done!")
}

sleep(1000)

console.log("Do something else...")