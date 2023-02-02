const tasks = document.querySelectorAll("h2")
const resultes = document.querySelectorAll("p")

function getCities(cb) {
    fetch("http://localhost:3000/cities")
    .then((response) => response.json())
    .then((response) => {
        cb(response)
    })
    .catch((err) => {
        console.log("error", err);
        cb(null)
    }); 
}

function taskA(cities){
    tasks[0].innerHTML = "a) wyświetli na stronie tylko miasta z województwa małopolskiego"
    
    let cities_malopolska = cities.filter( city => city.province == "małopolskie")

    resultes[0].innerHTML = cities_malopolska.map(city => city.name + " ")
}

function taskB(cities){
    tasks[1].innerHTML = "b) wyświetli  miasta które w swojej nazwie posiadają dwa znaki ‘a’."
    
    let cities_double_a = cities.filter(city => city.name.split("a").length -1 == 2);

    resultes[1].innerHTML = cities_double_a.map(city => city.name + " ");
}

function taskC(cities){
    tasks[2].innerHTML = "c) wyświetli  piąte pod kątem gęstości zaludnienia miasto w Polsce."
    
    let city_density_5 = cities.map(city => city.dentensity)
    city_density_5.sort( (a,b) => a - b);
    city_density_5.reverse();
    let city_density = cities.filter( city => city.dentensity == city_density_5[4] )

    resultes[2].innerHTML = city_density.map( city => city.name + " " + city.dentensity)
}

function taskD(cities){
    tasks[3].innerHTML = "d) dla wszystkich miast powyżej 100000 dodać (na końcu) city do nazwy."
    
    let city_over_100k = cities.filter( city => city.people > 100000 )

    resultes[3].innerHTML = city_over_100k.map( city => city.name + " city ")
}

function taskE(cities){
    tasks[4].innerHTML = "e) wyliczyć czy więcej jest miast powyżej 80000 mieszkańców czy poniżej wraz z informacją o ich liczbie"
    
    let city_under_80k = cities.filter( city => city.people < 80000 )
    let city_over_80k = cities.filter( city => city.people > 80000 )

    if( city_over_80k.length > city_under_80k.length )
        resultes[4].innerHTML = "Miast powyzej 80k: " + city_over_80k.length + " >  Miast ponizej 80k: " + city_under_80k.length
    else
        resultes[4].innerHTML = "Miast powyzej 80k: " + city_over_80k.length + " <  Miast ponizej 80k: " + city_under_80k.length
}

function taskF(cities){
    tasks[5].innerHTML = "f) jaka jest średnia powierzchnia miast z powiatów zaczynających się na literkę „P”"
    
    let city_starts_P = cities.filter( city => city.name[0] == "P" )
    let city_starts_P_area = city_starts_P.map(city => city.area)

    resultes[5].innerHTML = city_starts_P_area.reduce((a,b) => a+b, 0)/city_starts_P_area.length
}

function taskG(cities){
    tasks[6].innerHTML = "g) odpowiedz na pytanie czy wszystkie miasta z województwa pomorskiego są większe od 5000 osób i ile jest takich miast."
    
    let cities_pomorskie = cities.filter( city => city.province == "pomorskie");
    let cities_pomorskie_over_5k = cities_pomorskie.filter( city => city.people > 5000);

    if( cities_pomorskie.length > cities_pomorskie_over_5k.length )
        resultes[6].innerHTML = "Wszystkie miasta w pomorskim: " + cities_pomorskie.length + " > Miasta w pomorskim powyzej 5k: " + cities_pomorskie_over_5k.length;
    else
        resultes[6].innerHTML = "Wszystkie miasta w pomorskim: " + cities_pomorskie.length + " < Miasta w pomorskim powyzej 5k: " + cities_pomorskie_over_5k.length; 
}


getCities((cities) => {
    taskA(cities)

    taskB(cities)

    taskC(cities)

    taskD(cities)

    taskE(cities)

    taskF(cities)

    taskG(cities)
})