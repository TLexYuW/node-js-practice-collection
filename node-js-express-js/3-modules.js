// CommonJS - every file is module (by default)
// Modules - encapsulated code (only share minimum)
const names = require('./4-name')
const sayHi = require('./5-utils')
const data = require('./6-alternative')
require('./7-mind-grenade')


console.log(data)
console.log(names)

sayHi(names.j)
sayHi(names.p)