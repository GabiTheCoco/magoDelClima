import { createLI } from "./components/countries.js";
let input_country = document.querySelector("[input_country]");
let label_country = document.querySelector(".label_country");
let form_block = document.querySelector("[main_container-form]");
let header_section = document.querySelector("[main_container]");
let main = document.querySelector("[main_content]");
let countryUl = document.querySelector(".main_container_form_inputs-ul");

let weather_map_section = document.createElement("section");
let weather_container = document.createElement("div");
let map_container = document.createElement("div");

createLI();
countryUl.style.display = "none";
input_country.addEventListener("click", () => {
    countryUl.style.display = "flex";
    countryUl.style.justifyContent = "start";
    countryUl.style.width = input_country.style.width;
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

document.addEventListener("click", (event) => {
    if (!input_country.contains(event.target) && !countryUl.contains(event.target)) {
        countryUl.style.display = "none";
    }
})
// let change = JSON.parse(localStorage.getItem("change"));

// changePresentation(change);
// createWeatherMapSection();

// form_block.addEventListener('submit', (event) => {
//     event.preventDefault();
    header_section.style.flexDirection = "row";
    header_section.style.height = "10%";
    header_section.style.width = "100%";
    header_section.style.justifyContent = "space-around";
    form_block.style.flexDirection = "row";
    form_block.style.height = "auto";
    form_block.style.width = "35%";
    main.style.flexDirection = "column";
    main.style.justifyContent = "space-between";
    weather_map_section.classList.add("weather_map_container");
    weather_container.classList.add("weather_container");
    map_container.classList.add("map_container");
    weather_map_section.appendChild(weather_container);
    weather_map_section.appendChild(map_container);
    main.appendChild(weather_map_section);
//     localStorage.setItem("change", "true");
//     change = JSON.parse(localStorage.getItem("change"));

// });

// function changePresentation(change){
//     if(change){
//         header_section.style.flexDirection = "row";
//         header_section.style.height = "10%";
//         header_section.style.width = "100%";
//         header_section.style.justifyContent = "space-around";
//         form_block.style.flexDirection = "row";
//         form_block.style.height = "auto";
//         form_block.style.width = "35%";
//         main.style.flexDirection = "column";
//         main.style.justifyContent = "space-between";
//         main.appendChild(weather_map_section);
//     }
// }
// function createWeatherMapSection() {
    // weather_map_section.classList.add("weather_map_container");
    // weather_container.classList.add("weather_container");
    // map_container.classList.add("map_container");
    // weather_map_section.appendChild(weather_container);
    // weather_map_section.appendChild(map_container);
// }