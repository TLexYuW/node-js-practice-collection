const user = {
    firstName: "Patrick",
    lastName: "Scott",
    hobbies: ["Programming", "Piano"],
    listHobbies: function () {
        this.hobbies.forEach(function (hobby) {
            console.log(this) // global, window, { test: 'test' }
            console.log(this.firstName) // undefined
            console.log(hobby) // Programming, Piano
        }, { test: "test" })
    },
    listName: function () {
        this.hobbies.forEach(function () {
            console.log(this.firstName) // Patrick
        }, this)
    }
}

user.listHobbies()

user.listName()