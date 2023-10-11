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
        header_section.style.height = "10%";
        header_section.style.width = "100%";
        header_section.style.justifyContent = "space-around";
        form_block.style.flexDirection = "row";
        form_block.style.height = "auto";
        form_block.style.width = "35%";
        main.style.flexDirection = "column";
        main.style.justifyContent = "space-between";
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
    weather_container.classList.add("weather_container");
    map_container.classList.add("map_container");
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