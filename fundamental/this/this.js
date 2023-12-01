console.log(this); // {}

console.log("--------------------------------------------------------------")

console.log(global);

console.log("--------------------------------------------------------------")

function getUserDetails(date, interest) {
    console.log(`My name is ${this.name} and my age is ${this.age}, ${date}`)
}

const user1 = {
    age: 100,
    name: 'emp1',
    description: "I like to play with the ......",
    getDetails: getUserDetails
}

const user2 = {
    age: 200,
    name: 'emp2',
    aboutMe: "I like something ......",
    getDetails: getUserDetails
}

console.log(getUserDetails.bind(user1)); // [Function: bound getUserDetails] 

const u1details = getUserDetails.bind(user1); 

u1details(); // My name is emp1 and my age is 100, undefined

console.log("--------------------------------------------------------------")

getUserDetails.call(user2); // My name is emp2 and my age is 200, undefined

getUserDetails.call(user1, [1111, "errrrr"]); // My name is emp1 and my age is 100, 1111,errrrr

console.log("--------------------------------------------------------------")

user1.getDetails(); // My name is emp1 and my age is 100, undefined

console.log("--------------------------------------------------------------")

const u = user1.getDetails;

u(); // My name is undefined and my age is undefined, undefined