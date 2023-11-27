// const { stocks, order, production } = require('./callback-ver');
const { stocks, order } = require('./promise-ver');
const { kitchen } = require('./async-await-ver');

// order(0, production);

/*
order(2000, () => console.log(`${stocks.Fruits[0]} was selected`))
    .then(() => {
        return order(0, () => console.log("Production has started"));
    })
    .then(() => {
        return order(2000, () => console.log("The fruit has chopped"));
    })
    .then(() => {
        return order(1000, () => {
            console.log(`${stocks.liquid[0]} and ${stocks.liquid[1]} was added`);
        })
    })
    .then(() => {
        return order(1000, () => {
            console.log("The Machine was started");
        })
    })
    .then(() => {
        return order(2000, () => {
            console.log(`ice cream was placed on ${stocks.holder[0]}`);
        })
    })
    .then(() => {
        return order(3000, () => {
            console.log(`${stocks.toppings[0]} was added as toppings`)
        })
    })
    .then(() => {
        return order(1000, () => {
            console.log("Serve ice cream");
        })
    })
    .catch(() => {
        console.log("Customer left")
    })
    .finally(() => {
        console.log("day ended, shop is closed")
    })
*/



kitchen();