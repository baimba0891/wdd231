// Weather Section
const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";
const city = "Freetown";
const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

async function getWeather() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    const current = data.list[0];
    const forecast = data.list.slice(1, 4);

    document.getElementById("weather-data").innerHTML = `
      <p>Current: ${current.main.temp}°C, ${current.weather[0].description}</p>
      <ul>
        ${forecast.map((f, i) => `<li>Day ${i+1}: ${f.main.temp}°C</li>`).join("")}
      </ul>
    `;
  } catch (error) {
    document.getElementById("weather-data").innerHTML = "<p>Weather data unavailable.</p>";
  }
}
getWeather();

// Spotlights Section
async function loadSpotlights() {
  try {
    const response = await fetch("data/members.json");
    const members = await response.json();

    const goldSilver = members.filter(m => 
      m.membership === "Gold" || m.membership === "Silver"
    );

    const randomSpotlights = goldSilver
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const container = document.getElementById("spotlight-container");
    container.innerHTML = randomSpotlights.map(m => `
      <div class="spotlight-card">
        <img src="${m.logo}" alt="${m.name} logo">
        <h3>${m.name}</h3>
        <p>${m.address}</p>
        <p>${m.phone}</p>
        <a href="${m.website}" target="_blank">Visit Website</a>
        <p class="level">${m.membership} Member</p>
      </div>
    `).join("");
  } catch (error) {
    document.getElementById("spotlight-container").innerHTML = "<p>Spotlight data unavailable.</p>";
  }
}
loadSpotlights();
