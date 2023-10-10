

const apiKey = "85b829803b65c076df4ed662788af52f";

export function getWeatherData(city, country, map){
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
            localStorage.setItem("lat", dataJson.coord.lat)
            localStorage.setItem("lon", dataJson.coord.lon)
            changePosition(dataJson.coord.lat, dataJson.coord.lon, map, dataJson.name, dataJson.sys.country);
            // showData(dataJson);
            localStorage.setItem("change", "true");
            console.log(dataJson);
        }
    })
    .catch(error => {
        console.error(error);
    });
}

export function getMapData(map_container){
    map_container.setAttribute("id", "map");

    let map = L.map("map");

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // L.tileLayer(`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`, {
    // }).addTo(map);
    
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