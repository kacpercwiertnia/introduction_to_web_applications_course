const main = document.querySelector("main");
const area = document.querySelector("section");
const dot = document.querySelector("#red_dot");
const h3_alert = document.querySelector("h3");

main.addEventListener("click", e =>{
    let x = e.x;
    let y = e.y;
    
    h3_alert.style.display = "block"
    h3_alert.style.position = "absolute"
    h3_alert.style.left = x-25 + "px";
    h3_alert.style.top = y-25 + "px";
});

area.addEventListener("click", e =>{
    h3_alert.style.display = "none";
    e.stopPropagation();

    let x = e.x;
    let y = e.y;

    dot.style.left = (x-area.offsetLeft-25)+"px";
    dot.style.top = (y-area.offsetTop-25)+"px";
});

