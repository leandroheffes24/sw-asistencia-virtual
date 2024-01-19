let ubicacionPrincipal = window.scrollY
let header = document.querySelector("header")

window.addEventListener("scroll", function(){
    let ubicacionActual = window.scrollY

    if(ubicacionPrincipal>= ubicacionActual){
        header.style.top = "0px"
    } else {
        header.style.top = "-150px"
    }

    ubicacionPrincipal = ubicacionActual
})