let now = new Date();
console.log(now);

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let hours = now.getHours();

let minutes = now.getMinutes();

let date = document.querySelector("#now");
date.innerHTML = day + ", " + hours + ":" + minutes;

// current weather

function myPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat);
  console.log(lon);

  let apiKey = "faeef537be5414427a6c70a51cd4c87e";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

  function displayTemperature(response) {
    let currentTemperature = Math.round(response.data.main.temp);

    let tempValue = document.querySelector("#temp");
    tempValue.innerHTML = `${currentTemperature}ºC`;
    let city = document.querySelector("#city");
    city.innerHTML = "Current Location";
  }

  axios
    .get(`${apiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(displayTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(myPosition);
}

getCurrentPosition();

// change location

let cityInput = document.querySelector("#searchInput");
console.log(cityInput);

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  city.innerHTML = cityInput.value;

  function currentTemperature(response) {
    let temperatureC = Math.round(response.data.main.temp);
    let tempValue = document.querySelector("#temp");
    tempValue.innerHTML = `${temperatureC}ºC`;
  }

  let apiKey = "faeef537be5414427a6c70a51cd4c87e";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

  axios
    .get(`${apiUrl}${cityInput.value}&appid=${apiKey}&units=metric`)
    .then(currentTemperature);
}

let search = document.querySelector("#button");
search.addEventListener("click", changeCity);

let current = document.querySelector("#currentLocation");
current.addEventListener("click", getCurrentPosition);
