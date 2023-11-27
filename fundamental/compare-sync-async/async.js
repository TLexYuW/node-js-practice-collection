console.log("Start Operation");

function sleep(milliseconds) {
    console.log("operation is running");

    setTimeout(() => {
        console.log("Operation is done!")
    }, milliseconds)

}

sleep(2000)

console.log("Do something else...")