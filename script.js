const apiKey = "1578cb176f67bdd1b1c560d1b26c11b6"; // Replace with your OpenWeatherMap API key

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (city === "") {
    alert("Please enter a city name!");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    document.getElementById("weatherResult").innerHTML = `<p>${error.message}</p>`;
    document.getElementById("weatherResult").style.display = "block";
  }
}

function displayWeather(data) {
  const weatherDiv = document.getElementById("weatherResult");
  weatherDiv.style.display = "block";

  const city = data.name;
  const temp = data.main.temp;
  const desc = data.weather[0].description;
  const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  weatherDiv.innerHTML = `
    <h2>${city}</h2>
    <img src="${icon}" alt="${desc}">
    <p><strong>Temperature:</strong> ${temp} °C</p>
    <p><strong>Condition:</strong> ${desc}</p>
  `;
}
