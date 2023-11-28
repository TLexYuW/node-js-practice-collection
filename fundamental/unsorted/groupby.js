let ppl = [
    { name: "John", age: 2 },
    { name: "Jane", age: 100 },
    { name: "Jeff", age: 50 },
]

function adultsOnly(p) {
    if (p.age >= 21) {
        return 'adult';
    }
    return 'minor';
}

const organized = Object.groupBy(ppl, adultsOnly);

// console.log(organized)