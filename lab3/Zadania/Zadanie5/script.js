const div_blue = document.querySelector("#blue");
const div_red = document.querySelector("#red");
const div_yellow = document.querySelector("#yellow");
const h4_alert = document.querySelector("#alert");
const h2_counter = document.querySelector("#counter");
const button_start_stop = document.querySelector("#start_stop");
const button_reset = document.querySelector("#reset");
const button_order = document.querySelector("#order");

let counter = 0;
let propagation = true;
let order = false;

function stopBubble(e){
    if(!e){
        let e = window.event;
    }

    if(!propagation){
        if(e.stopPropagation){
            e.stopPropagation();
        }
    }
}

function checkIfToDisable(){
    if( counter > 30 ){
        div_red.style.backgroundColor = "grey"
    }

    if( counter > 50 ){
        div_yellow.style.backgroundColor = "grey"
    }
}

function blueAddPoints(e){
    stopBubble(e);
    counter += 1;
    h2_counter.innerHTML = counter;
    h4_alert.innerHTML += "nacisnąłeś niebieski o wartości 1</br>";
    checkIfToDisable()
}

function redAddPoints(e){
    if( counter <= 30 ){
        stopBubble(e);
        counter += 2;
        h2_counter.innerHTML = counter;
        h4_alert.innerHTML += "nacisnąłeś czerwony o wartości 2</br>";
        checkIfToDisable()
    }
}

function yellowAddPoints(e){
    if( counter <= 50 ){
        stopBubble(e);
        counter += 5;
        h2_counter.innerHTML = counter;
        h4_alert.innerHTML += "nacisnąłeś zółty o wartości 5</br>";
        checkIfToDisable()
    }
}

function changeOrder(){
    div_blue.removeEventListener("click", blueAddPoints, order);
    div_red.removeEventListener("click", redAddPoints, order);
    div_yellow.removeEventListener("click", yellowAddPoints, order);

    order = !order;

    div_blue.addEventListener("click", blueAddPoints, order);
    div_red.addEventListener("click", redAddPoints, order);
    div_yellow.addEventListener("click", yellowAddPoints, order);


    if(!order){
        button_order.innerHTML = "Reverse Order"
    }else{
        button_order.innerHTML = "Standard Order"
    }
}

function chnagePropagation(){
    propagation = !propagation;

    if(!propagation){
        button_start_stop.innerHTML = "Start Propagation"
    }else{
        button_start_stop.innerHTML = "Stop Propagation"
    }
}

function reset(){
    counter = 0;
    if( order ){
        changeOrder();
    }
    if(!propagation){
        chnagePropagation();
    }

    h2_counter.innerHTML = counter;
    h4_alert.innerHTML = "";
    div_red.style.backgroundColor = "red"
    div_yellow.style.backgroundColor = "yellow"
}

div_blue.addEventListener("click", blueAddPoints, order);

div_red.addEventListener("click", redAddPoints, order);

div_yellow.addEventListener("click", yellowAddPoints, order);

button_start_stop.addEventListener("click", chnagePropagation);

button_reset.addEventListener("click", reset);

button_order.addEventListener("click", changeOrder);