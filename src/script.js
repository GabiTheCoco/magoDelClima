import { createLI } from "./components/countries.js";
import { getWeatherData, getMapData, weatherWatcher } from "./components/getData.js";
import { crearCositas } from "./components/createWeatherDivs.js";

let input_country = document.querySelector("[input_country]");
let input_city = document.querySelector("[input_city]");
let form_block = document.querySelector("[main_container-form]");
let header_section = document.querySelector("[main_container]");
let main = document.querySelector("[main_content]");
let countryUl = document.querySelector(".main_container_form_inputs-ul");
let button = document.querySelector(".main_container_form-button");

let weather_map_section = document.createElement("section");
let weather_container = document.createElement("div");
let map_list = document.createElement("div");
let map_container = document.createElement("div");


createWeatherMapSection();
let mapa = getMapData(map_container);

let change = JSON.parse(localStorage.getItem("change")) || [];
console.log(change);
let codeIso = localStorage.getItem("codeIso");
let city = localStorage.getItem("city");
let validation = JSON.parse(localStorage.getItem("validation")) || [];



if(codeIso && city && change){
    // changePresentation(change);
    // getWeatherData(city, codeIso, mapa);
    weatherWatcher(codeIso, city, validation, mapa);
}

createLI();

// Mostrar lista de paises
countryUl.style.display = "none";
input_country.addEventListener("click", () => {
    countryUl.style.display = "flex";
    countryUl.style.justifyContent = "start";
    countryUl.style.width = input_country.style.width;
    countryUl.style.minWidth = input_country.style.width;
});


// Filtrar por nombre la lista de paises
let countries = document.querySelectorAll(".countryLi");

input_country.addEventListener('input', function() {
    const searchTerm = input_country.value.toUpperCase();

    countries.forEach(countrie => {
        const text = countrie.textContent.toUpperCase();
        if (text.includes(searchTerm)) {
            countrie.style.display = 'block';
        } else {
            countrie.style.display = 'none';
        }
    });
});

// Esconder lista de paises
document.addEventListener("click", (event) => {
    if (!input_country.contains(event.target) && !countryUl.contains(event.target)) {
        countryUl.style.display = "none";
    }
})

// Evento para seleccionar un pais de la lista
countries.forEach(countrie => {
    countrie.addEventListener("click", () => {
        input_country.value = countrie.textContent;
        let codigoIso = countrie.getAttribute("value");
        input_country.setAttribute("codeIso", codigoIso);
        countryUl.style.display = "none";
    })
});


form_block.addEventListener('submit', (event) => {
    event.preventDefault();
    // localStorage.setItem("change", "true");
    // change = JSON.parse(localStorage.getItem("change"));
    // changePresentation(change);
    let validation = countryValidation(input_country.value);
    weatherWatcher(input_country.getAttribute("codeIso"), input_city.value, validation, mapa);
});

export function changePresentation(change){
    if(change){
        header_section.style.flexDirection = "row";
        header_section.style.height = "12%";
        header_section.style.width = "99%";
        header_section.style.borderRadius = ".6em"
        header_section.style.justifyContent = "space-around";
        main.style.justifyContent = "center";
        header_section.style.boxShadow = "0px 0px 15px 12px #ffffff10";
        form_block.style.flexDirection = "row";
        form_block.style.height = "auto";
        form_block.style.width = "35%";
        main.style.flexDirection = "column";
        // main.style.justifyContent = "space-between";
        // header_section.style.flexDirection = "column";
        weather_map_section.style.display = 'flex';

        button.innerHTML = " ";
        button.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i>`;
        button.style.fontSize = "1.2em";
        button.style.borderRadius = "40%";
    }else{
    }
}

function createWeatherMapSection() {
    weather_map_section.classList.add("weather_map_container");
    map_list.classList.add("map_list_container");
    weather_container.classList.add("weather_container");
    map_container.classList.add("map_container");

    let temp_layer = document.createElement("div");
    temp_layer.classList.add("temp_layer-div");
    temp_layer.setAttribute("map_layer", "");
    temp_layer.innerHTML = "T";

    let cloud_layer = document.createElement("div");
    cloud_layer.classList.add("cloud_layer-div");
    cloud_layer.setAttribute("map_layer", "");
    cloud_layer.innerHTML = "C"

    let precipitation_layer = document.createElement("div");
    precipitation_layer.classList.add("precipitation_layer-div");
    precipitation_layer.setAttribute("map_layer", "");
    precipitation_layer.innerHTML = "PC"

    let pressure_layer = document.createElement("div");
    pressure_layer.classList.add("pressure_layer-div");
    pressure_layer.setAttribute("map_layer", "");
    pressure_layer.innerHTML = "PS";

    
    let wind_layer = document.createElement("div");
    wind_layer.classList.add("wind_layer-div");
    wind_layer.setAttribute("map_layer", "");
    wind_layer.innerHTML = "W";

    map_list.appendChild(temp_layer);
    map_list.appendChild(cloud_layer);
    map_list.appendChild(precipitation_layer);
    map_list.appendChild(pressure_layer);
    map_list.appendChild(wind_layer);

    map_container.appendChild(map_list);
     
    weather_map_section.appendChild(weather_container);
    weather_map_section.appendChild(map_container);
    main.appendChild(weather_map_section);
    crearCositas(weather_container);
}

function countryValidation(countryValue){
    let country_entered = countryValue.toUpperCase();
    let validation = false;
    countries.forEach((countrie => {
        if (country_entered.includes(countrie.textContent.toUpperCase())) {
            input_country.setAttribute("codeIso", countrie.getAttribute("value"));
            validation = true;
            return validation;
        } else {
            return validation;
        }
    }));
}