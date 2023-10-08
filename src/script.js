
let input_country = document.querySelector(".main_container_form_inputs-country");
let label_country = document.querySelector(".label_country");
let form_block = document.querySelector("[main_container-form]");
let header_section = document.querySelector("[main_container]");
let main = document.querySelector("[main_content]");

let weather_map_section = document.createElement("section");
let weather_container = document.createElement("div");
let map_container = document.createElement("div");



let change = JSON.parse(localStorage.getItem("change"));

changePresentation(change);
createWeatherMapSection();

function checkInput(searchInput, label) {
    if (searchInput.value !== '') {
      label.classList.add('active-label1');
    } else {
      label.classList.remove('active-label1');
    }
}

input_country.addEventListener('input', () => {
    checkInput(input_country, label_country);
});

form_block.addEventListener('submit', (event) => {
    event.preventDefault();

    localStorage.setItem("change", "true");
    change = JSON.parse(localStorage.getItem("change"));

});

function changePresentation(change){
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
        main.appendChild(weather_map_section);
    }
}
function createWeatherMapSection() {
    weather_map_section.classList.add("weather_map_container");
    weather_container.classList.add("weather_container");
    map_container.classList.add("map_container");
    weather_map_section.appendChild(weather_container);
    weather_map_section.appendChild(map_container);
}