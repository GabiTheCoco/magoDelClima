import { changePresentation } from "../script.js";

const apiKey = "85b829803b65c076df4ed662788af52f";

export function getWeatherData(country, city, map, change){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric&lang=es`;

    fetch(url)
    .then(data => {
        return data.json()
    })
    .then(dataJson => {
        if(dataJson.cod === '404' || dataJson.cod === '401'){
            alert('País o ciudad equivocada, intente de nuevo por favor.');
        } else{          
            localStorage.setItem("codeIso", country);
            localStorage.setItem("city", city);
            localStorage.setItem("lat", dataJson.coord.lat);
            localStorage.setItem("lon", dataJson.coord.lon);
            // changePresentation(change);
            changePosition(dataJson.coord.lat, dataJson.coord.lon, map, dataJson.name, dataJson.sys.country);
            showData(dataJson);
            localStorage.setItem("change", "true");
            console.log(dataJson);
        }
    })
    .catch(error => {
        console.error(error);
    });
}

export function showData(data){
    const {main:{temp, feels_like, humidity, temp_max, temp_min}, weather:[arr], sys:{sunrise, sunset}, timezone} = data;
    
    let city_country_name = document.querySelector(".city_country_name");
    let img_temp = document.querySelector(".img_temp");
    let actual_temp = document.querySelector(".actual_temp");
    let actual_sensation = document.querySelector(".actual_sensation");
    let max_temp = document.querySelector(".max_temp");
    let min_temp = document.querySelector(".min_temp");
    let humid = document.querySelector(".humidity");
    let sunr = document.querySelector(".sunrise");
    let suns = document.querySelector(".sunset");
    
    city_country_name.innerHTML = data.name +", " + data.sys.country;

    img_temp.src = `https://openweathermap.org/img/wn/${arr.icon}@2x.png`;
    actual_temp.innerHTML = Math.round(temp) + "°c";
    actual_sensation.innerHTML = Math.round(feels_like) + "°c";
    max_temp.innerHTML = Math.round(temp_max) + "°c";
    min_temp.innerHTML = Math.round(temp_min) + "°c";
    humid.innerHTML = humidity + "%";
        
    let salida = convertirUnixAHorasMinutos(sunrise, timezone);
    let puesta = convertirUnixAHorasMinutos(sunset, timezone);
    sunr.innerHTML = salida.HHmm;
    suns.innerHTML = puesta.HHmm;
}


function convertirUnixAHorasMinutos(unixTime, timeZone) {
    let fecha = new Date(unixTime * 1000);
    let offsetMillisegundos = timeZone * 1000;
    let fechaLocal = new Date(fecha.getTime() + offsetMillisegundos);
    let horas = fechaLocal.getHours() + 3;
    let minutos = fechaLocal.getMinutes();
    let horasFormateadas = ("0" + horas).slice(-2);
    let minutosFormateados = ("0" + minutos).slice(-2);
    let soloMinutos = horas*60 + minutos;
    
    let retorno = { min: soloMinutos, HHmm: horasFormateadas + ":" + minutosFormateados };
    return retorno;
}


export function getMapData(map_container){
    map_container.setAttribute("id", "map");

    let map = L.map("map");

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    L.tileLayer(`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`, {
    }).addTo(map);
    
    return map;
}

let bandera = true;

export function changePosition(lat, long, map, city, country){

    if(!bandera)
        map.flyTo([lat, long], 4);
    else{
        map.setView([lat, long], 4);
        bandera = false;
    }
    

    let marcador = L.marker([lat, long]).addTo(map).bindPopup((city + ", " + country));

    marcador.on("dblclick", () => {
        map.flyTo([lat, long], 12);
    })
    
}

export function weatherWatcher(codeIso, city, validation, map){
    if(codeIso === "" || codeIso === null && city === "" && !validation){
        alert("Seleccione un país de la lista o ingreselo correctamente, por favor.");
    }else{
        localStorage.setItem("validation", "true");
        localStorage.setItem("change", "true");
        let change = JSON.parse(localStorage.getItem("change"));
        changePresentation(change);
        getWeatherData(codeIso, city, map, change);
    }

}

// let countries = document.querySelectorAll(".countryLi");
// let input_country = document.querySelector("[input_country]");
// function countryValidation(countryValue){
//     let country_entered = countryValue.toUpperCase();
//     let validation = false;
//     countries.forEach((countrie => {
//         if (country_entered.includes(countrie.textContent.toUpperCase())) {
//             input_country.setAttribute("codeIso", countrie.getAttribute("value"));
//             validation = true;
//             return validation;
//         } else {
//             return validation;
//         }
//     }));
// }