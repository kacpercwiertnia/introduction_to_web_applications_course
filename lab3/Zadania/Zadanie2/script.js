let obrazek = document.querySelector("img");
let button = document.querySelector("button");
const colors = ["red", "blue", "green"]
const obrazki = ["1.jpeg", "0.jpeg", "2.jpeg"]
let clicks = 0;

button.addEventListener("click", event => {
    clicks = (clicks+1)%3;
    obrazek.src = obrazki[clicks];
    obrazek.style.borderColor = colors[clicks];
});