const apiKey = "dbad0a4cd88b885dcc1c1c9ec1dab4f6";
const weatherDisplay = document.getElementById("weather-display");
const getWeatherBtn = document.getElementById("get-weather-btn");
const cityInput = document.getElementById("city-input");

getWeatherBtn.addEventListener("click", () => {
  const city = cityInput.value;
  if (city) {
    fetchWeatherData(city);
  } else {
    alert("Please enter a city name!");
  }
});

function fetchWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric;`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === 200) {
        displayWeather(data);
      } else {
        weatherDisplay.innerHTML = "<p>City not found.</p>";
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      weatherDisplay.innerHTML =
        "<p> Error fetching weather daata. Please try again.</p>";
    });
}

function displayWeather(data) {
  const {
    name,
    timezone,
    main: { temp, pressure },
    weather: [{ description }],
  } = data;

  weatherDisplay.innerHTML = `<p>City: ${name}</p>
    <p>Temperature: ${temp}C</p>
    <p>Condition: ${description}</p>
    <p>Pressure: ${pressure}</p>
    <p>timezone: ${timezone}</p>`;
}
