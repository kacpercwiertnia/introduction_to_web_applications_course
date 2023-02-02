const display_1_5 = document.querySelector("#display_1_5")
const display_6_10 = document.querySelector("#display_6_10")
const display_11_15 = document.querySelector("#display_11_15")
const display_16_20 = document.querySelector("#display_16_20")
const display_21_25 = document.querySelector("#display_21_25")
const all_displays = [display_1_5, display_6_10, display_11_15, display_16_20, display_21_25]
let current_display = display_1_5;
const display_ranges = [[0,4],[5,9],[10,14],[15,19],[20,24]]
const main_list = document.querySelector("main");
const sort_sub_desc = document.querySelector("#sort_sub_desc")
const sort_sub_asc = document.querySelector("#sort_sub_asc")
const sort_pop_desc = document.querySelector("#sort_pop_desc")
const sort_pop_asc = document.querySelector("#sort_pop_asc")
const sort_area_desc = document.querySelector("#sort_area_desc")
const sort_area_asc = document.querySelector("#sort_area_asc")
const all_sort_subregions = [sort_sub_desc, sort_sub_asc, sort_pop_desc, sort_pop_asc, sort_area_desc, sort_area_asc]
const sub_name_search = document.querySelector("#sub_name_search")
const sub_pop_search = document.querySelector("#sub_pop_search")
const sub_area_search = document.querySelector("#sub_area_search")
const sub_name_input = document.querySelector("#sub_name_input")
const sub_pop_input = document.querySelector("#sub_pop_input")
const sub_area_input = document.querySelector("#sub_area_input")
let searchedSubNames = []
let searchedSubPop = []
let searchedSubArea = []
let searchedCountriesNames = []
let searchedCountiresCapitals = []
let searchedCountriesPop = []
let searchedCountriesArea = []

function getCountries(cb) {
    fetch("http://localhost:3000/countries")
    .then((response) => response.json())
    .then((response) => {
        cb(response)
    })
    .catch((err) => {
        console.log("error", err);
        cb(null)
    }); 
}

function printCountries(countriesList, index, way, where){
    if( index == 1 ){
        if(way == "asc"){
            countriesList.sort( function (a,b){
                if (a[1] < b[1]) return -1;
                if (a[1] > b[1]) return 1;
                return  0;
            })
        }else if( way == "desc"){
            countriesList.sort( function (a,b){
                if (a[1] > b[1]) return -1;
                if (a[1] < b[1]) return 1;
                return  0;
            })
        }
    }else if( index == 2){
        if(way == "asc"){
            countriesList.sort( function (a,b){
                if (a[2][0] < b[2][0]) return -1;
                if (a[2][0] > b[2][0]) return 1;
                return  0;
            })
        }else if( way == "desc"){
            countriesList.sort( function (a,b){
                if (a[2][0] > b[2][0]) return -1;
                if (a[2][0] < b[2][0]) return 1;
                return  0;
            })
        }
    }else{
        if( way == "asc" ) {
            countriesList.sort( (a,b) => b[index] - a[index] )
        }else if( way == "desc") {
            countriesList.sort( (a,b) => a[index] - b[index] )
        }
    }

    while( where.childElementCount > 4 ){
        where.removeChild(where.lastChild)
    }

    for( const el of countriesList ){
        let i = 0

        let ul_country = document.createElement("ul")

        let li_name = document.createElement("li")
        let li_capital = document.createElement("li")
        let li_population = document.createElement("li")
        let li_area = document.createElement("li")
 
        li_name.innerHTML += el[1]
        li_capital.innerHTML += el[2][0]
        li_population.innerHTML = el[3]
        li_area.innerHTML = el[4]

        ul_country.appendChild(li_name)
        ul_country.appendChild(li_capital)
        ul_country.appendChild(li_population)
        ul_country.appendChild(li_area)

        where.appendChild(ul_country)
    }

}

function printSubregions(subregionsList, countryList, checkers, index, way, current_display, display_ranges){
    if( index == 0 ){
        if(way == "asc"){
            subregionsList.sort( function (a,b){
                if (a[0] < b[0]) return -1;
                if (a[0] > b[0]) return 1;
                return  0;
            })
        }else if( way == "desc"){
            subregionsList.sort( function (a,b){
                if (a[0] > b[0]) return -1;
                if (a[0] < b[0]) return 1;
                return  0;
            })
        }
    }else{
        if( way == "asc" ) {
            subregionsList.sort( (a,b) => b[index] - a[index] )
        }else if( way == "desc") {
            subregionsList.sort( (a,b) => a[index] - b[index] )
        }
    }

    main_list.innerHTML = ""

    let i = 0;
    let range = []
    
    if(current_display == display_1_5)
        range = display_ranges[0]
    else if(current_display == display_6_10)
        range = display_ranges[1]
    else if(current_display == display_11_15)
        range = display_ranges[2]
    else if(current_display == display_16_20)
        range = display_ranges[3]
    else
        range = display_ranges[4]

    for( const el of subregionsList ){

        if( i >= range[0] && i <= range[1]){
            let ul_subregions = document.createElement("ul")

            let li_name = document.createElement("li")
            let li_population = document.createElement("li")
            let li_area = document.createElement("li")
            let li_span = document.createElement("span")

            li_span.className = "material-symbols-outlined"
            li_span.innerHTML = "chevron_right"
            li_name.appendChild(li_span)
            li_name.innerHTML += el[0]
            li_population.innerHTML = el[1]
            li_area.innerHTML = el[2]

            ul_subregions.appendChild(li_name)
            ul_subregions.appendChild(li_population)
            ul_subregions.appendChild(li_area)

            main_list.appendChild(ul_subregions)

            li_name.firstChild.addEventListener("click", () => {
                checkers[i] = !checkers[i]
                if (checkers[i]){
                    li_name.firstChild.innerHTML = "expand_more"
                    let countriesFromSubregion = countryList.filter( country => country[0] == el[0])

                    let new_ul = document.createElement("ul");

                    let li_new_name = document.createElement("li")
                    let li_new_capital = document.createElement("li")
                    let li_new_population = document.createElement("li")
                    let li_new_area = document.createElement("li")

                    let span_name_desc = document.createElement("span")
                    let span_name_asc = document.createElement("span")
                    let div_name_search = document.createElement("div")
                    let span_name_search = document.createElement("span")
                    let input_name_search = document.createElement("input")

                    let span_capital_desc = document.createElement("span")
                    let span_capital_asc = document.createElement("span")
                    let div_capital_search = document.createElement("div")
                    let span_capital_search = document.createElement("span")
                    let input_capital_search = document.createElement("input")

                    let span_pop_desc = document.createElement("span")
                    let span_pop_asc = document.createElement("span")
                    let div_pop_search = document.createElement("div")
                    let span_pop_search = document.createElement("span")
                    let input_pop_search = document.createElement("input")

                    let span_area_desc = document.createElement("span")
                    let span_area_asc = document.createElement("span")
                    let div_area_search = document.createElement("div")
                    let span_area_search = document.createElement("span")
                    let input_area_search = document.createElement("input")

                    span_name_desc.className = "material-symbols-outlined"
                    span_name_asc.className = "material-symbols-outlined"
                    span_name_search.className = "material-symbols-outlined"
                    input_name_search.type = "text"

                    span_capital_desc.className = "material-symbols-outlined"
                    span_capital_asc.className = "material-symbols-outlined"
                    span_capital_search.className = "material-symbols-outlined"
                    input_capital_search.type = "text"

                    span_pop_desc.className = "material-symbols-outlined"
                    span_pop_asc.className = "material-symbols-outlined"
                    span_pop_search.className = "material-symbols-outlined"
                    input_pop_search.type = "number"

                    span_area_desc.className = "material-symbols-outlined"
                    span_area_asc.className = "material-symbols-outlined"
                    span_area_search.className = "material-symbols-outlined"
                    input_area_search.type = "number"

                    span_name_desc.innerHTML = "arrow_drop_down"
                    span_name_asc.innerHTML = "arrow_drop_up"
                    span_name_search.innerHTML = "search"
                    input_name_search.style.display = "none"

                    span_capital_desc.innerHTML = "arrow_drop_down"
                    span_capital_asc.innerHTML = "arrow_drop_up"
                    span_capital_search.innerHTML = "search"
                    input_capital_search.style.display = "none"
                    
                    span_pop_desc.innerHTML = "arrow_drop_down"
                    span_pop_asc.innerHTML = "arrow_drop_up"
                    span_pop_search.innerHTML = "search"
                    input_pop_search.style.display = "none"
                    
                    span_area_desc.innerHTML = "arrow_drop_down"
                    span_area_asc.innerHTML = "arrow_drop_up"
                    span_area_search.innerHTML = "search"
                    input_area_search.style.display = "none"

                    const spans_orders = [span_name_desc, span_name_asc, span_capital_desc, span_capital_asc, span_pop_desc, span_pop_asc, span_area_desc, span_area_asc]

                    span_name_desc.addEventListener("click", () =>{
                        span_name_desc.style.color = "green";
                        changeColor(span_name_desc, spans_orders);
                        printCountries(countriesFromSubregion, 1, "desc", ul_subregions)
                    })
                    
                    span_name_asc.addEventListener("click", () =>{
                        span_name_asc.style.color = "green";
                        changeColor(span_name_asc, spans_orders);
                        printCountries(countriesFromSubregion, 1, "asc", ul_subregions)
                    })
                    
                    span_capital_desc.addEventListener("click", () =>{
                        span_capital_desc.style.color = "green";
                        changeColor(span_capital_desc, spans_orders);
                        printCountries(countriesFromSubregion, 2, "desc", ul_subregions)
                    })

                    span_capital_asc.addEventListener("click", () =>{
                        span_capital_asc.style.color = "green";
                        changeColor(span_capital_asc, spans_orders);
                        printCountries(countriesFromSubregion, 2, "asc", ul_subregions)
                    })
                    
                    span_pop_desc.addEventListener("click", () =>{
                        span_pop_desc.style.color = "green";
                        changeColor(span_pop_desc, spans_orders);
                        printCountries(countriesFromSubregion, 3, "desc", ul_subregions)
                    })

                    span_pop_asc.addEventListener("click", () =>{
                        span_pop_asc.style.color = "green";
                        changeColor(span_pop_asc, spans_orders);
                        printCountries(countriesFromSubregion, 3, "asc", ul_subregions)
                    })
                    
                    span_area_desc.addEventListener("click", () =>{
                        span_area_desc.style.color = "green";
                        changeColor(span_area_desc, spans_orders);
                        printCountries(countriesFromSubregion, 4, "desc", ul_subregions)
                    })
                    
                    span_area_asc.addEventListener("click", () =>{
                        span_area_asc.style.color = "green";
                        changeColor(span_area_asc, spans_orders);
                        printCountries(countriesFromSubregion, 4, "asc", ul_subregions)
                    })

                    li_new_name.innerHTML = "Official Name"
                    li_new_name.appendChild(span_name_desc)
                    li_new_name.appendChild(span_name_asc)
                    div_name_search.appendChild(span_name_search)
                    div_name_search.appendChild(input_name_search)
                    li_new_name.appendChild(div_name_search)

                    li_new_capital.innerHTML = "Capital"
                    li_new_capital.appendChild(span_capital_desc)
                    li_new_capital.appendChild(span_capital_asc)
                    div_capital_search.appendChild(span_capital_search)
                    div_capital_search.appendChild(input_capital_search)
                    li_new_capital.appendChild(div_capital_search)

                    li_new_population.innerHTML = "Population"
                    li_new_population.appendChild(span_pop_desc)
                    li_new_population.appendChild(span_pop_asc)
                    div_pop_search.appendChild(span_pop_search)
                    div_pop_search.appendChild(input_pop_search)
                    li_new_population.appendChild(div_pop_search)

                    li_new_area.innerHTML = "Area"
                    li_new_area.appendChild(span_area_desc)
                    li_new_area.appendChild(span_area_asc)
                    div_area_search.appendChild(span_area_search)
                    div_area_search.appendChild(input_area_search)
                    li_new_area.appendChild(div_area_search)

                    new_ul.appendChild(li_new_name)
                    new_ul.appendChild(li_new_capital)
                    new_ul.appendChild(li_new_population)
                    new_ul.appendChild(li_new_area)

                    ul_subregions.appendChild(new_ul) 

                    printCountries(countriesFromSubregion, 0, "none", ul_subregions)
                    
                    const checkersSearch = [false, false, false, false]
                    searchedCountriesNames = countriesFromSubregion
                    searchedCountiresCapitals = countriesFromSubregion
                    searchedCountriesPop = countriesFromSubregion
                    searchedCountriesArea = countriesFromSubregion

                    span_name_search.addEventListener("click", () => {
                        checkersSearch[0] = !checkersSearch[0]
                        searchedCountriesNames = countriesFromSubregion
                        let capitalResultes = searchedCountiresCapitals.map( country => country[1])
                        let popResultes = searchedCountriesPop.map( country => country[1])
                        let areaResultes = searchedCountriesArea.map( country => country[1])
                        let commonPhrases = searchedCountriesNames.filter( el => capitalResultes.includes(el[1]))
                        commonPhrases = commonPhrases.filter( el => popResultes.includes(el[1]) )
                        commonPhrases = commonPhrases.filter( el => areaResultes.includes(el[1]) )
                        printCountries(commonPhrases, 0, "none", ul_subregions)

                        if( checkersSearch[0]){
                            span_name_search.style.color = "green"
                            input_name_search.style.display = "block"
                        }else{
                            span_name_search.style.color = "grey"
                            input_name_search.style.display = "none"
                            input_name_search.value = ""
                        }
                    })

                    input_name_search.addEventListener("input", (e) => {
                        let searchedPhrase = e.target.value;
                        searchedCountriesNames = countriesFromSubregion.filter(country => country[1].includes(searchedPhrase))
                        let capitalResultes = searchedCountiresCapitals.map( country => country[1])
                        let popResultes = searchedCountriesPop.map( country => country[1])
                        let areaResultes = searchedCountriesArea.map( country => country[1])
                        let commonPhrases = searchedCountriesNames.filter( el => capitalResultes.includes(el[1]))
                        commonPhrases = commonPhrases.filter( el => popResultes.includes(el[1]) )
                        commonPhrases = commonPhrases.filter( el => areaResultes.includes(el[1]) )
                        printCountries(commonPhrases, 0, "none", ul_subregions)
                    })

                    span_capital_search.addEventListener("click", () => {
                        checkersSearch[1] = !checkersSearch[1]
                        searchedCountiresCapitals = countriesFromSubregion
                        let namesResultes = searchedCountriesNames.map( country => country[2][0])
                        let popResultes = searchedCountriesPop.map( country => country[2][0])
                        let areaResultes = searchedCountriesArea.map( country => country[2][0])
                        let commonPhrases = searchedCountiresCapitals.filter( el => namesResultes.includes(el[2][0]))
                        commonPhrases = commonPhrases.filter( el => popResultes.includes(el[2][0]) )
                        commonPhrases = commonPhrases.filter( el => areaResultes.includes(el[2][0]) )
                        printCountries(commonPhrases, 0, "none", ul_subregions)

                        if( checkersSearch[1]){
                            span_capital_search.style.color = "green"
                            input_capital_search.style.display = "block"
                        }else{
                            span_capital_search.style.color = "grey"
                            input_capital_search.style.display = "none"
                            input_capital_search.value = ""
                        }
                    })

                    input_capital_search.addEventListener("input", (e) => {
                        let searchedPhrase = e.target.value;
                        searchedCountiresCapitals = countriesFromSubregion.filter(country => country[2][0].includes(searchedPhrase))
                        let namesResultes = searchedCountriesNames.map( country => country[2][0])
                        let popResultes = searchedCountriesPop.map( country => country[2][0])
                        let areaResultes = searchedCountriesArea.map( country => country[2][0])
                        let commonPhrases = searchedCountiresCapitals.filter( el => namesResultes.includes(el[2][0]))
                        commonPhrases = commonPhrases.filter( el => popResultes.includes(el[2][0]) )
                        commonPhrases = commonPhrases.filter( el => areaResultes.includes(el[2][0]) )
                        printCountries(commonPhrases, 0, "none", ul_subregions)
                    })

                    span_pop_search.addEventListener("click", () => {
                        checkersSearch[2] = !checkersSearch[2]
                        searchedCountriesPop = countriesFromSubregion
                        let namesResultes = searchedCountriesNames.map( country => country[3])
                        let capitalResultes = searchedCountiresCapitals.map( country => country[3])
                        let areaResultes = searchedCountriesArea.map( country => country[3])
                        let commonPhrases = searchedCountriesPop.filter( el => namesResultes.includes(el[3]))
                        commonPhrases = commonPhrases.filter( el => capitalResultes.includes(el[3]) )
                        commonPhrases = commonPhrases.filter( el => areaResultes.includes(el[3]) )
                        printCountries(commonPhrases, 0, "none", ul_subregions)

                        if( checkersSearch[2]){
                            span_pop_search.style.color = "green"
                            input_pop_search.style.display = "block"
                        }else{
                            span_pop_search.style.color = "grey"
                            input_pop_search.style.display = "none"
                            input_pop_search.value = ""
                        }
                    })

                    input_pop_search.addEventListener("input", (e) => {
                        let searchedPhrase = e.target.value;
                        searchedCountriesPop = countriesFromSubregion.filter(country => country[3].toString().includes(searchedPhrase))
                        let namesResultes = searchedCountriesNames.map( country => country[3])
                        let capitalResultes = searchedCountiresCapitals.map( country => country[3])
                        let areaResultes = searchedCountriesArea.map( country => country[3])
                        let commonPhrases = searchedCountriesPop.filter( el => namesResultes.includes(el[3]))
                        commonPhrases = commonPhrases.filter( el => capitalResultes.includes(el[3]) )
                        commonPhrases = commonPhrases.filter( el => areaResultes.includes(el[3]) )
                        printCountries(commonPhrases, 0, "none", ul_subregions)
                    })

                    span_area_search.addEventListener("click", () => {
                        checkersSearch[3] = !checkersSearch[3]
                        searchedCountriesArea = countriesFromSubregion
                        let namesResultes = searchedCountriesNames.map( country => country[4])
                        let capitalResultes = searchedCountiresCapitals.map( country => country[4])
                        let popResultes = searchedCountriesPop.map( country => country[4])
                        let commonPhrases = searchedCountriesArea.filter( el => namesResultes.includes(el[4]))
                        commonPhrases = commonPhrases.filter( el => capitalResultes.includes(el[4]) )
                        commonPhrases = commonPhrases.filter( el => popResultes.includes(el[4]) )
                        printCountries(commonPhrases, 0, "none", ul_subregions)

                        if( checkersSearch[3]){
                            span_area_search.style.color = "green"
                            input_area_search.style.display = "block"
                        }else{
                            span_area_search.style.color = "grey"
                            input_area_search.style.display = "none"
                            input_area_search.value = ""
                        }
                    })

                    input_area_search.addEventListener("input", (e) => {
                        let searchedPhrase = e.target.value;
                        searchedCountriesArea = countriesFromSubregion.filter(country => country[4].toString().includes(searchedPhrase))
                        let namesResultes = searchedCountriesNames.map( country => country[4])
                        let capitalResultes = searchedCountiresCapitals.map( country => country[4])
                        let popResultes = searchedCountriesPop.map( country => country[4])
                        let commonPhrases = searchedCountriesArea.filter( el => namesResultes.includes(el[4]))
                        commonPhrases = commonPhrases.filter( el => capitalResultes.includes(el[4]) )
                        commonPhrases = commonPhrases.filter( el => popResultes.includes(el[4]) )
                        printCountries(commonPhrases, 0, "none", ul_subregions)
                    })
                }else{
                    li_name.firstChild.innerHTML = "chevron_right"
                    while( ul_subregions.childElementCount > 3 ){
                        ul_subregions.removeChild(ul_subregions.lastChild)
                    }
                }
            })
        }
        i++;
    }
}

function changeColor(noChange, list){
    for( const el of list ){
        if( el != noChange ){
            el.style.color = "grey";
        }
    }
}

getCountries((countries) => {
    display_1_5.style.color = "green";

    const list_sub_area_pop = countries.map(country => {
        let p1 = country.subregion
        let p2 = country.name.official
        let p3 = country.capital
        let p4 = country.population
        let p5 = country.area

        if( country.subregion == undefined )
            p1 = "Undefined"
        if( country.name.official == undefined)
            p2 = "Undefined"
        if( country.capital == undefined )
            p3 = ["Undefined"]
        if( country.population == undefined )
            p4 = "Undefined"
        if( country.area == undefined )
            p5 = "Undefined"

       return [p1, p2, p3, p4, p5]
    });

    const allCountriesSubregions = countries.map(country => {
        if(country.subregion == undefined )
            return "Undefined"
        else
            return country.subregion
    });

    const subregios = allCountriesSubregions.filter( function(item, pos, self) {
        return self.indexOf(item) == pos;
    })

    const checkers = subregios.map( subregion => false);

    const subregionsPopulationArea = [];

    for( const el of subregios ){
        let countriesOfSubregion = list_sub_area_pop.filter( country => country[0] == el)
        
        let population = countriesOfSubregion.map( country => country[3])
        let area = countriesOfSubregion.map( country => country[4])

        let sumPopulation = population.reduce((a,b) => a+b, 0);
        let sumArea = area.reduce((a,b) => a+b, 0);

        subregionsPopulationArea.push([el,sumPopulation,sumArea])
    }
    
    printSubregions(subregionsPopulationArea, list_sub_area_pop, checkers, 0, "none", current_display, display_ranges)
    
    display_1_5.addEventListener("click", () =>{
        display_1_5.style.color = "green";
        display_6_10.style.color = "rgb(67, 73, 85)";
        display_11_15.style.color = "rgb(67, 73, 85)";
        display_16_20.style.color = "rgb(67, 73, 85)";
        display_21_25.style.color = "rgb(67, 73, 85)";
        current_display = display_1_5;
        sub_area_input.style.display = "none"
        sub_area_search.style.color = "grey"
        sub_area_input.value = ""
        sub_name_input.style.display = "none"
        sub_name_search.style.color = "grey"
        sub_name_input.value = ""
        sub_pop_input.style.display = "none"
        sub_pop_search.style.color = "grey"
        sub_pop_input.value = ""
        checkersSearch[0] = false
        checkersSearch[1] = false
        checkersSearch[2] = false
        printSubregions(subregionsPopulationArea, list_sub_area_pop, checkers, 0, "none", current_display, display_ranges)
    })

    display_6_10.addEventListener("click", () =>{
        display_1_5.style.color = "rgb(67, 73, 85)";
        display_6_10.style.color = "green";
        display_11_15.style.color = "rgb(67, 73, 85)";
        display_16_20.style.color = "rgb(67, 73, 85)";
        display_21_25.style.color = "rgb(67, 73, 85)";
        current_display = display_6_10;
        sub_area_input.style.display = "none"
        sub_area_search.style.color = "grey"
        sub_area_input.value = ""
        sub_name_input.style.display = "none"
        sub_name_search.style.color = "grey"
        sub_name_input.value = ""
        sub_pop_input.style.display = "none"
        sub_pop_search.style.color = "grey"
        sub_pop_input.value = ""
        checkersSearch[0] = false
        checkersSearch[1] = false
        checkersSearch[2] = false
        printSubregions(subregionsPopulationArea, list_sub_area_pop, checkers, 0, "none", current_display, display_ranges)
    })

    display_11_15.addEventListener("click", () =>{
        display_1_5.style.color = "rgb(67, 73, 85)";
        display_6_10.style.color = "rgb(67, 73, 85)";
        display_11_15.style.color = "green";
        display_16_20.style.color = "rgb(67, 73, 85)";
        display_21_25.style.color = "rgb(67, 73, 85)";
        current_display = display_11_15;
        sub_area_input.style.display = "none"
        sub_area_search.style.color = "grey"
        sub_area_input.value = ""
        sub_name_input.style.display = "none"
        sub_name_search.style.color = "grey"
        sub_name_input.value = ""
        sub_pop_input.style.display = "none"
        sub_pop_search.style.color = "grey"
        sub_pop_input.value = ""
        checkersSearch[0] = false
        checkersSearch[1] = false
        checkersSearch[2] = false
        printSubregions(subregionsPopulationArea, list_sub_area_pop, checkers, 0, "none", current_display, display_ranges)
    })

    display_16_20.addEventListener("click", () =>{
        display_1_5.style.color = "rgb(67, 73, 85)";
        display_6_10.style.color = "rgb(67, 73, 85)";
        display_11_15.style.color = "rgb(67, 73, 85)";
        display_16_20.style.color = "green";
        display_21_25.style.color = "rgb(67, 73, 85)";
        current_display = display_16_20;
        sub_area_input.style.display = "none"
        sub_area_search.style.color = "grey"
        sub_area_input.value = ""
        sub_name_input.style.display = "none"
        sub_name_search.style.color = "grey"
        sub_name_input.value = ""
        sub_pop_input.style.display = "none"
        sub_pop_search.style.color = "grey"
        sub_pop_input.value = ""
        checkersSearch[0] = false
        checkersSearch[1] = false
        checkersSearch[2] = false
        printSubregions(subregionsPopulationArea, list_sub_area_pop, checkers, 0, "none", current_display, display_ranges)
    })

    display_21_25.addEventListener("click", () =>{
        display_1_5.style.color = "rgb(67, 73, 85)";
        display_6_10.style.color = "rgb(67, 73, 85)";
        display_11_15.style.color = "rgb(67, 73, 85)";
        display_16_20.style.color = "rgb(67, 73, 85)";
        display_21_25.style.color = "green";
        current_display = display_21_25;
        sub_area_input.style.display = "none"
        sub_area_search.style.color = "grey"
        sub_area_input.value = ""
        sub_name_input.style.display = "none"
        sub_name_search.style.color = "grey"
        sub_name_input.value = ""
        sub_pop_input.style.display = "none"
        sub_pop_search.style.color = "grey"
        sub_pop_input.value = ""
        checkersSearch[0] = false
        checkersSearch[1] = false
        checkersSearch[2] = false
        printSubregions(subregionsPopulationArea, list_sub_area_pop, checkers, 0, "none", current_display, display_ranges)
    })

    sort_sub_desc.addEventListener("click", () =>{
        sort_sub_desc.style.color = "green";
        changeColor(sort_sub_desc, all_sort_subregions);
        display_1_5.style.color = "green";
        display_6_10.style.color = "rgb(67, 73, 85)";
        display_11_15.style.color = "rgb(67, 73, 85)";
        display_16_20.style.color = "rgb(67, 73, 85)";
        display_21_25.style.color = "rgb(67, 73, 85)";
        current_display = display_1_5;
        printSubregions(subregionsPopulationArea, list_sub_area_pop, checkers, 0, "desc", current_display, display_ranges)
    })
    
    sort_sub_asc.addEventListener("click", () =>{
        sort_sub_asc.style.color = "green";
        changeColor(sort_sub_asc, all_sort_subregions);
        display_1_5.style.color = "green";
        display_6_10.style.color = "rgb(67, 73, 85)";
        display_11_15.style.color = "rgb(67, 73, 85)";
        display_16_20.style.color = "rgb(67, 73, 85)";
        display_21_25.style.color = "rgb(67, 73, 85)";
        current_display = display_1_5;
        printSubregions(subregionsPopulationArea, list_sub_area_pop, checkers, 0, "asc", current_display, display_ranges)
    })
    
    sort_pop_desc.addEventListener("click", () =>{
        sort_pop_desc.style.color = "green";
        changeColor(sort_pop_desc, all_sort_subregions);
        display_1_5.style.color = "green";
        display_6_10.style.color = "rgb(67, 73, 85)";
        display_11_15.style.color = "rgb(67, 73, 85)";
        display_16_20.style.color = "rgb(67, 73, 85)";
        display_21_25.style.color = "rgb(67, 73, 85)";
        current_display = display_1_5;
        printSubregions(subregionsPopulationArea, list_sub_area_pop, checkers, 1, "desc", current_display, display_ranges)
    })
    
    sort_pop_asc.addEventListener("click", () =>{
        sort_pop_asc.style.color = "green";
        changeColor(sort_pop_asc, all_sort_subregions);
        display_1_5.style.color = "green";
        display_6_10.style.color = "rgb(67, 73, 85)";
        display_11_15.style.color = "rgb(67, 73, 85)";
        display_16_20.style.color = "rgb(67, 73, 85)";
        display_21_25.style.color = "rgb(67, 73, 85)";
        current_display = display_1_5;
        printSubregions(subregionsPopulationArea, list_sub_area_pop, checkers, 1, "asc", current_display, display_ranges)
    })
    
    sort_area_desc.addEventListener("click", () =>{
        sort_area_desc.style.color = "green";
        changeColor(sort_area_desc, all_sort_subregions);
        display_1_5.style.color = "green";
        display_6_10.style.color = "rgb(67, 73, 85)";
        display_11_15.style.color = "rgb(67, 73, 85)";
        display_16_20.style.color = "rgb(67, 73, 85)";
        display_21_25.style.color = "rgb(67, 73, 85)";
        current_display = display_1_5;
        printSubregions(subregionsPopulationArea, list_sub_area_pop, checkers, 2, "desc", current_display, display_ranges)
    })
    
    sort_area_asc.addEventListener("click", () =>{
        sort_area_asc.style.color = "green";
        changeColor(sort_area_asc, all_sort_subregions);
        display_1_5.style.color = "green";
        display_6_10.style.color = "rgb(67, 73, 85)";
        display_11_15.style.color = "rgb(67, 73, 85)";
        display_16_20.style.color = "rgb(67, 73, 85)";
        display_21_25.style.color = "rgb(67, 73, 85)";
        current_display = display_1_5;
        printSubregions(subregionsPopulationArea, list_sub_area_pop, checkers, 2, "asc", current_display, display_ranges)
    })

    const checkersSearch = [false, false, false]
    searchedSubNames = subregionsPopulationArea
    searchedSubPop = subregionsPopulationArea
    searchedSubArea = subregionsPopulationArea
    
    sub_name_input.style.display = "none"
    sub_pop_input.style.display = "none"
    sub_area_input.style.display = "none"

    sub_name_search.addEventListener("click", () => {
        checkersSearch[0] = !checkersSearch[0]
        searchedSubNames = subregionsPopulationArea
        let popResultes = searchedSubPop.map( subregion => subregion[0])
        let areaResultes = searchedSubArea.map( subregion => subregion[0])
        let commonPhrases = searchedSubNames.filter( el => popResultes.includes(el[0]))
        commonPhrases = commonPhrases.filter( el => areaResultes.includes(el[0]) )
        printSubregions(commonPhrases, list_sub_area_pop, checkers, 0, "none", current_display, display_ranges)

        if( checkersSearch[0]){
            sub_name_search.style.color = "green"
            sub_name_input.style.display = "block"
        }else{
            sub_name_search.style.color = "grey"
            sub_name_input.style.display = "none"
            sub_name_input.value = ""
        }
        
    })

    sub_name_input.addEventListener("input", (e) => {
        let searchedPhrase = e.target.value;
        searchedSubNames = subregionsPopulationArea.filter(subregion => subregion[0].includes(searchedPhrase))

        let popResultes = searchedSubPop.map( subregion => subregion[0])
        let areaResultes = searchedSubArea.map( subregion => subregion[0])
        let commonPhrases = searchedSubNames.filter( el => popResultes.includes(el[0]))
        commonPhrases = commonPhrases.filter( el => areaResultes.includes(el[0]) )
        printSubregions(commonPhrases, list_sub_area_pop, checkers, 0, "none", current_display, display_ranges)
    })

    sub_pop_search.addEventListener("click", () => {
        checkersSearch[1] = !checkersSearch[1]
        searchedSubPop = subregionsPopulationArea
        let namesResultes = searchedSubNames.map( subregion => subregion[1])
        let areaResultes = searchedSubArea.map( subregion => subregion[1])
        let commonPhrases = searchedSubPop.filter( el => namesResultes.includes(el[1]))
        commonPhrases = commonPhrases.filter( el => areaResultes.includes(el[1]) )
        printSubregions(commonPhrases, list_sub_area_pop, checkers, 0, "none", current_display, display_ranges)

        if( checkersSearch[1]){
            sub_pop_search.style.color = "green"
            sub_pop_input.style.display = "block"
        }else{
            sub_pop_search.style.color = "grey"
            sub_pop_input.style.display = "none"
            sub_pop_input.value = ""
        }
    })

    sub_pop_input.addEventListener("input", (e) => {
        let searchedPhrase = e.target.value;
        searchedSubPop = subregionsPopulationArea.filter(subregion => subregion[1].toString().includes(searchedPhrase))
        let namesResultes = searchedSubNames.map( subregion => subregion[1])
        let areaResultes = searchedSubArea.map( subregion => subregion[1])
        let commonPhrases = searchedSubPop.filter( el => namesResultes.includes(el[1]))
        commonPhrases = commonPhrases.filter( el => areaResultes.includes(el[1]) )
        printSubregions(commonPhrases, list_sub_area_pop, checkers, 0, "none", current_display, display_ranges)
    })

    sub_area_search.addEventListener("click", () => {
        checkersSearch[2] = !checkersSearch[2]
        searchedSubArea = subregionsPopulationArea
        let namesResultes = searchedSubNames.map( subregion => subregion[2])
        let popResultes = searchedSubPop.map( subregion => subregion[2])
        let commonPhrases = searchedSubArea.filter( el => namesResultes.includes(el[2]))
        commonPhrases = commonPhrases.filter( el => popResultes.includes(el[2]) )
        printSubregions(commonPhrases, list_sub_area_pop, checkers, 0, "none", current_display, display_ranges)

        if( checkersSearch[2]){
            sub_area_search.style.color = "green"
            sub_area_input.style.display = "block"
        }else{
            sub_area_search.style.color = "grey"
            sub_area_input.style.display = "none"
            sub_area_input.value = ""
        }
    })

    sub_area_input.addEventListener("input", (e) => {
        let searchedPhrase = e.target.value;
        searchedSubArea = subregionsPopulationArea.filter(subregion => subregion[2].toString().includes(searchedPhrase))
        let namesResultes = searchedSubNames.map( subregion => subregion[2])
        let popResultes = searchedSubPop.map( subregion => subregion[2])
        let commonPhrases = searchedSubArea.filter( el => namesResultes.includes(el[2]))
        commonPhrases = commonPhrases.filter( el => popResultes.includes(el[2]) )
        printSubregions(commonPhrases, list_sub_area_pop, checkers, 0, "none", current_display, display_ranges)
    })
});