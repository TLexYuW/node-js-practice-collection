const userLogin = () => {
    console.log("Enter Username and Password");
    let username = prompt("Enter username: ");
    let password = prompt("Enter password: ");

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Performing User Authentication");
            if (username === 'admin' && password === 'admin') {
                resolve("User Authenticated!");
            } else {
                reject("Authentication Failed!");
            }
        }, 1000);
    });
};

function goToHomePage(userAuthStatus) {
    return Promise.resolve(`Go to Homepage as : ${userAuthStatus}`);
}

/*
userLogin()
    .then(resp => {
        console.log("Validate User");
        return goToHomePage(resp);
    })
    .then(userAuthStatus => {
        console.log(userAuthStatus);
    })
    .catch(err => {
        console.log(err);
    });
*/

async function performTask() {
    try {
        const resp = await userLogin();
        console.log("Validate User");
        const userAuthStatus = await goToHomePage(resp);
        console.log(userAuthStatus);
    } catch (error) {
        console.log(error);
    }
}

performTask();