Promise.resolve().then(() => console.log(1));


setTimeout(() => console.log(2), 10)

queueMicrotask(() => {
    console.log(3)

    queueMicrotask(() => console.log(4))
})

console.log(5);

/*
5
1
3
4
2
*/