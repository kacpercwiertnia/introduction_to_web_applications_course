const ul_lista = document.querySelector("ul");
const lista = [];
let numOfElements = 0;

function displayList(where, list){
    where.innerHTML = "";

    for( let el in list ){
        where.innerHTML += "<li>" + list[el] + "</li>";
    }
}

document.addEventListener("keydown", event => {
    if( event.key == 'ArrowDown' ){
        numOfElements++;
        lista.push("item nr: "+numOfElements);
        displayList(ul_lista, lista);
    }else if( event.key == 'ArrowUp' ){
        lista.shift();
        displayList(ul_lista, lista);
    }
});