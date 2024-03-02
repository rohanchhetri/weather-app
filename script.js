const url =
  "https://api.openweathermap.org/data/2.5/weather?&appid=13b9f444e75ffe0ef5824d11f539c63a&units=metric&q=";
async function checkWeather() {
  const city = document.getElementById("userinput").value;
  const response = await fetch(url + city);

  var data = await response.json();

  if (!response.ok) {
    alert("An error occured while fetching date.");
  } else {
    document.getElementById("city").innerHTML =
      data.name + ", " + data.sys.country;
    document.getElementById(
      "temperature"
    ).innerHTML = `${data.main.temp.toFixed(1)}°C`;
    document.getElementById("description").innerHTML = data.weather[0].main;
    document.getElementById("average").innerHTML = `${(
      (data.main.temp_max + data.main.temp_min) /
      2
    ).toFixed(1)}°C`;
    document.getElementById(
      "high-temp"
    ).innerHTML = `${data.main.temp_max.toFixed(1)}°C`;
    document.getElementById(
      "low-temp"
    ).innerHTML = `${data.main.temp_min.toFixed(1)}°C`;
    document.getElementById("sunrise").innerHTML = timeFormatter(
      data.sys.sunrise,
      data.timezone
    );
    document.getElementById("sunset").innerHTML = timeFormatter(
      data.sys.sunset,
      data.timezone
    );
    document.getElementById("wind").innerHTML = data.wind.speed.toFixed(1);
    document.getElementById("direction").innerHTML = windDirection(
      data.wind.deg
    );
    document.getElementById(
      "feels"
    ).innerHTML = `${data.main.feels_like.toFixed(1)}°C`;
    document.getElementById("humidity").innerHTML = `${data.main.humidity}%`;

    if (data.weather[0].main == "Clouds") {
      document.getElementById("weather-icon").src = "/src/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      document.getElementById("weather-icon").src = "/src/clear.png";
    } else if (data.weather[0].main == "Rain") {
      document.getElementById("weather-icon").src = "/src/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      document.getElementById("weather-icon").src = "/src/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      document.getElementById("weather-icon").src = "/src/mist.png";
    } else if (data.weather[0].main == "Snow") {
      document.getElementById("weather-icon").src = "/src/snow.png";
    } else {
      document.getElementById("weather-icon").alt = "Error getting image";
    }
  }
}
checkWeather();
let onEnterPress = () => {
  const inputElement = document.getElementById("userinput");
  // Add an event listener for the "keydown" event
  inputElement.addEventListener("keydown", function (event) {
    // Check if the pressed key is Enter (key code 13)
    if (event.key === "Enter") {
      // Call the function when Enter key is pressed
      checkWeather();
    }
  });
};
onEnterPress();
let timeFormatter = (timestamp, offsetSeconds) => {
  // Convert Unix timestamp to milliseconds
  const unixTimestampInMilliseconds = timestamp * 1000;
  // Apply the timezone offset in milliseconds
  const timestampWithOffset =
    unixTimestampInMilliseconds + offsetSeconds * 1000;
  const date = new Date(timestampWithOffset);
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  let formattedDateTime;
  if (hours > 12) {
    hours = 24 - hours;
    formattedDateTime = " PM";
  } else {
    formattedDateTime = " AM";
  }
  formattedDateTime = `${padZero(hours)}:${padZero(
    minutes
  )}${formattedDateTime}`;

  return formattedDateTime;
};
const padZero = (number) => {
  // Add leading zero if the number is less than 10
  return number < 10 ? `0${number}` : number;
};

let windDirection = (direction) => {
  direction = direction >= 0 && direction < 30 ? "North NE" : direction;
  direction = direction >= 30 && direction < 60 ? "North East" : direction;
  direction = direction >= 60 && direction < 90 ? "East NE" : direction;
  direction = direction >= 90 && direction < 120 ? "East SE" : direction;
  direction = direction >= 120 && direction < 150 ? "South East" : direction;
  direction = direction >= 150 && direction < 180 ? "South SE" : direction;
  direction = direction >= 180 && direction < 210 ? "South SW" : direction;
  direction = direction >= 210 && direction < 240 ? "South West" : direction;
  direction = direction >= 240 && direction < 270 ? "West SW" : direction;
  direction = direction >= 270 && direction < 300 ? "West NW" : direction;
  direction = direction >= 300 && direction < 330 ? "North West" : direction;
  direction = direction >= 330 && direction < 360 ? "North NW" : direction;
  return direction;
};
let inputClear = () => {
  const input = (document.getElementById("userinput").value = "");
};
