console.log(global);

const os = require('os');
const path = require('path');
const math = require("./math");
const { add, subtract, multiply, divide } = require("./math");
const { mod } = require("./math2");

console.log(os.type());
console.log(os.version());
console.log(os.homedir());
console.log(os.arch());


console.log(__dirname);
console.log(__filename);

console.log("path.dirname(__filename) = " + path.dirname(__filename));
console.log("path.basename(__filename) = " + path.basename(__filename));
console.log("path.extname(__filename) = " + path.extname(__filename));
console.log(path.parse(__filename));

console.log(math.add(1, 1));
console.log(subtract(5, 2));
console.log(mod(10, 3));