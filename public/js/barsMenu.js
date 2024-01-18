const menuBarsButton = document.querySelector(".headerBarsMenuButton")
const menuBarsInterface = document.querySelector(".menuBarsInterface")
const menuBarsCloseButton = document.querySelector(".headerCloseBarsMenuButton")

menuBarsButton.addEventListener("click", (e) => {
    console.log("se abrio el menu");
    menuBarsInterface.classList.toggle("display-block")
    menuBarsButton.classList.toggle("display-none")
})

menuBarsCloseButton.addEventListener("click", (e) => {
    console.log("se cerro el menu");
    menuBarsInterface.classList.toggle("display-block")
    menuBarsButton.classList.toggle("display-none")
})