const $ = function (selector) {
    const elements = document.querySelectorAll.call(document, selector)

    // functionallity
    const library = {
        elements,
        addClass(className) {
            this.elements.forEach(element => {
                element.classList.add(className)
            });
            return library
        },
        fadeOut(duration) {
            this.elements.forEach(element => {
                let c_opacity = 1
                const decrement = 1 / (duration / 10)

                const fade = setInterval(() => {
                    c_opacity = decrement
                    element.style.opacity = c_opacity
                    if (c_opacity <= 0) {
                        clearInterval(fade)
                        element.style.display = "none"
                    }
                }, 10)
            })
            return library
        }
    }
    return library
}


$('.title').addClass('add-test-title')

$('.p').addClass('add-test-p').fadeOut(20)
