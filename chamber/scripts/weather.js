// Replace with your own OpenWeatherMap API Key - Get free at https://openweathermap.org/api
const apiKey = 'YOUR_API_KEY_HERE';
const lat = 8.4657;
const lon = -13.2317;

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function apiFetch() {
  try {
    const response = await fetch(currentWeatherUrl);
    if (response.ok) {
      const data = await response.json();
      displayCurrentWeather(data);
    } else {
      throw Error(await response.text());
    }

    const forecastResponse = await fetch(forecastUrl);
    if (forecastResponse.ok) {
      const forecastData = await forecastResponse.json();
      displayForecast(forecastData);
    }
  } catch (error) {
    console.log(error);
    // Fallback demo data if no API key yet
    document.getElementById('current-temp').textContent = '28°C';
    document.getElementById('weather-desc').textContent = 'partly cloudy - Demo';
  }
}

function displayCurrentWeather(data) {
  const temp = document.getElementById('current-temp');
  const desc = document.getElementById('weather-desc');
  const icon = document.getElementById('weather-icon');

  temp.innerHTML = `${data.main.temp.toFixed(0)}&deg;C`;
  desc.textContent = data.weather[0].description;
  const iconSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  icon.setAttribute('src', iconSrc);
  icon.setAttribute('alt', data.weather[0].description);
}

function displayForecast(data) {
  const forecastDiv = document.getElementById('forecast');
  forecastDiv.innerHTML = '';
  // API returns every 3 hours, we need 3 days. Take midday entries.
  const filtered = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

  filtered.forEach(item => {
    const date = new Date(item.dt_txt);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const div = document.createElement('div');
    div.innerHTML = `
      <p><strong>${dayName}</strong></p>
      <p>${item.main.temp.toFixed(0)}&deg;C</p>
      <p><small>${item.weather[0].description}</small></p>
    `;
    forecastDiv.appendChild(div);
  });
}

apiFetch();
