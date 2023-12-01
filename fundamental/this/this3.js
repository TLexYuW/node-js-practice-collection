const user = {
    "name": "Developer",
    regularFunction: function () {
        console.log(this.name)
    },
    arrowFunction: () => {
        console.log(this.name)
    }
};

console.log(user)

user.regularFunction() // Developer

user.arrowFunction() // undefined
