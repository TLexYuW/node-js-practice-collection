// Shop Time(Step -> Secs)
// 1. Place Order -> 2
// 2. Cut the fruit -> 2
// 3. Add water and ice -> 1
// 4. Start the machine -> 1
// 5. Select Container -> 2
// 6. Select Toppings -> 3
// 7. Seven Ice Cream -> 2

let stocks = {
    Fruits: ["strawberry", "grapes", "banana", "apple"],
    liquid: ["water", "ice"],
    holder: ["cone", "cup", "stick"],
    toppings: ["chocolate", "peanuts"]
};

const order = (Fruit_name, call_production) => {
    setTimeout(() => {
        console.log(`${stocks.Fruits[Fruit_name]} was selected`);
    }, 2000);
    call_production();
};

const production = () => {
    setTimeout(() => {
        console.log("production has started");

        setTimeout(() => {
            console.log("The fruit has chopped");

            setTimeout(() => {
                console.log(`${stocks.liquid[0]} and ${stocks.liquid[1]} was added`);

                setTimeout(() => {
                    console.log("The Machine was started");

                    setTimeout(() => {
                        console.log(`ice cream was placed on ${stocks.holder[0]}`);

                        setTimeout(() => {
                            console.log(`${stocks.toppings[0]} was added as toppings`);

                            setTimeout(() => {
                                console.log("Serve ice cream");
                            }, 2000);
                        }, 3000);
                    }, 2000);
                }, 1000);
            }, 1000);
        }, 2000);
    }, 0);
};


module.exports = {
    stocks,
    order,
    production
}