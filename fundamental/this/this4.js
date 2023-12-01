const title = document.querySelector(".title");
const p = document.querySelector(".p");

title.addEventListener('click', function () {
    console.log(this) // <h1 class="title">
});


title.addEventListener('click', () => {
    console.log(this) // window object
})

p.addEventListener('click', function () {
    console.log(this) // <p class="p">
});


p.addEventListener('click', () => {
    console.log(this) // window object
})