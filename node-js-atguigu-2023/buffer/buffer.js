/**
 *  (hex)
*/
// 1. alloc (clear old buffer)
let buffer = Buffer.alloc(10);
console.log(buffer);

// 2. allocUsafe
let buf_2 = Buffer.allocUnsafe(10000);
console.log(buf_2);

// 3. from 
let buf_3 = Buffer.from('hello world');
console.log(buf_3);

let buf_4 = Buffer.from([105, 108, 111, 118, 101, 121, 111, 117]);
console.log(buf_4);