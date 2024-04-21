const menuBarsButton = document.querySelector(".headerBarsMenuButton")
const menuBarsInterface = document.querySelector(".menuBarsInterface")
const menuBarsCloseButton = document.querySelector(".headerCloseBarsMenuButton")

menuBarsButton.addEventListener("click", (e) => {
    menuBarsInterface.classList.toggle("display-flex")
    menuBarsButton.classList.toggle("display-none")
})

menuBarsCloseButton.addEventListener("click", (e) => {
    menuBarsInterface.classList.toggle("display-flex")
    menuBarsButton.classList.toggle("display-none")
})