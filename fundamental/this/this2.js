class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    describe() {
        console.log(`${this.name} is now a user and his age is ${this.age}`)
    }
}

const user = new User("Developer", 100);

user.describe();