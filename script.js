const url =
  "https://api.openweathermap.org/data/2.5/weather?&appid=13b9f444e75ffe0ef5824d11f539c63a&units=metric&q=";
async function checkWeather() {
  const city = document.getElementById("userinput").value;
  const response = await fetch(url + city);
  var data = await response.json();

  if (!response.ok) {
    alert("An error occured while fetching date.");
  } else {
    console.log(data);
    console.log(data.main.feels_like);

    document.getElementById("city").innerHTML = data.name;
    document.getElementById(
      "temperature"
    ).innerHTML = `${data.main.temp.toFixed(1)}°C`;
    document.getElementById("description").innerHTML =
      data.weather[0].description;
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
    document.getElementById("wind").innerHTML = data.wind.speed.toFixed(1);
    document.getElementById(
      "feels"
    ).innerHTML = `${data.main.feels_like.toFixed(1)}°C`;
    document.getElementById("humidity").innerHTML = `${data.main.humidity}%`;
  }
}

checkWeather();
