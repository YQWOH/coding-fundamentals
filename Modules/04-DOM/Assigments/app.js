const addButton = document.querySelector(".add__button")
const notification = document.querySelector(".notification")
const crossbutton = document.querySelector(".cta__button")

function closeNotify() {
    notification.classList.remove('show')
}

function addCart() {
    notification.classList.add('show')
    setTimeout(() => {
        closeNotify()
    }, 3000)
}

addButton.addEventListener('click', addCart)
crossbutton.addEventListener('click', closeNotify)