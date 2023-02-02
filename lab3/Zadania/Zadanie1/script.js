let button = document.querySelector("button");

button.addEventListener("mousedown", event => {
    let imie = prompt("Jak masz na imię?");
    if(imie[imie.length-1] == 'a'){
        document.querySelector("h5").innerHTML = "Witam panią: " + imie;
    }else{
        document.querySelector("h5").innerHTML = "Witam pana: " + imie;
    }
});