console.log(this);

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

console.log(getUserDetails.bind(user1));

const u1details = getUserDetails.bind(user1);

u1details();

console.log("--------------------------------------------------------------")

getUserDetails.call(user2);

getUserDetails.call(user1, [1111, "errrrr"]);

console.log("--------------------------------------------------------------")



console.log("--------------------------------------------------------------")

user1.getDetails();

console.log("--------------------------------------------------------------")

const u = user1.getDetails;

u();