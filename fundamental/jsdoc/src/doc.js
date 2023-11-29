// @ts-check

const { add, subtract, divide, multiply } = require("./calculator");

/**
 * @file doc.js is the root file for this demo app
 * @author Lex
 * @see <a href="https://example.com">Example Website</a>
 */


/**
 * Name
 * @type {string}
 */
const studentName = "John";

/**
 * @type {Array<number>}
 */
const grades = [99, 8, 78, 21, 100];

/**
 * @type { {id: number|string, text: string} }
 */
const todo = {
  id: 1,
  text: "Hello",
};

/**
 * Your Description
 * @param {number} amount
 * @param {number} tax
 * @return {string} - Total
 */
const calculateTax = (amount, tax) => {
  return `$${amount + tax * amount}`;
};

// console.log(calculateTax(100, 0.1));

/**
 * @typedef {Object} Student
 * @property {number} id
 * @property {string} name
 * @property {string|number} [age]
 * @property {boolean} isActive
 */

/**
 * @type {Student}
 */
const student = {
  id: 1,
  name: "John",
  age: 100,
  isActive: true,
};

class Person {
  /**
   *
   * @param {Object} infos
   */
  constructor(infos) {
    /**
     * @property {string} name
     */
    this.name = infos.name;
    /**
     * @property {string} age
     */
    this.age = infos.age;
  }

  /**
   * @property {Function} greet
   * @return void
   */
  greet() {
    console.log(`Hi, my name is ${this.name} and I am ${this.age}`);
  }
}

/**
 * See {@link Person}
 */
const p1 = new Person({
  name: "John",
  age: 10000,
});

// console.log(p1);

console.log(add(100, 1));
