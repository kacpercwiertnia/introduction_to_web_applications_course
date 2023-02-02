const button_on_off = document.getElementById("on_off");
const button_increase = document.getElementById("increase");
const h1_counter = document.querySelector("h1");
let active = true;
let counter = 0;

button_on_off.addEventListener("mousedown", event => {
    active = !active;
    
    if(active){
        button_on_off.innerHTML = "DISABLE"
    }else{
        counter = 0;
        h1_counter.innerHTML = counter;
        button_on_off.innerHTML = "ACTIVE"
    }
});

button_increase.addEventListener("mousedown", event => {
    if(active){
        counter++;

        h1_counter.innerHTML = counter;
    }
});