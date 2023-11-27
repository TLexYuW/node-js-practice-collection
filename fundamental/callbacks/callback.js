const fs = require('fs');

console.log("First");
fs.readFile(__filename, () => {
    console.log("Second");
})
console.log("Third")

