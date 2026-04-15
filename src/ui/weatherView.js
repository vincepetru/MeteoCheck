import { getWeatherByCity } from '../services/weatherService.js';
import { get5DayForecastByCity } from '../services/get5DayByCity.js';

/* ===============================
   ELEMENTI DOM
   =============================== */

const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city-input');
const output = document.getElementById('weather-output');

/* ===============================
   INIZIALIZZAZIONE APP
   =============================== */

export function initializeWeatherApp() {
  console.log('✅ Weather App inizializzata');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const city = cityInput.value.trim();

    if (!city) {
      renderMessage('Inserisci il nome di una città.', 'warning');
      return;
    }

    renderMessage('Caricamento in corso...', 'info');

    try {
      // ✅ METEO CORRENTE
      const weather = await getWeatherByCity(city);
      renderWeather(weather);

      // ✅ PREVISIONE 5 GIORNI
      const forecast = await get5DayForecastByCity(city);
      render5DayForecast(forecast);

    } catch (error) {
      console.error(error);
      renderMessage(error.message, 'error');
    }
  });
}

/* ===============================
   RENDER METEO CORRENTE
   =============================== */

function renderWeather(weather) {
  output.innerHTML = `
    <div class="weather-card">
      <h2>${weather.city}, ${weather.country}</h2>
      <p class="weather-time">Aggiornato: ${weather.time}</p>
      <p class="weather-temp">${weather.temperature}</p>
      <p>Vento: ${weather.windSpeed} (${weather.windDirection})</p>
      <p>Giorno: ${weather.isDay ? 'Sì' : 'No'}</p>
    </div>
  `;
}

/* ===============================
   RENDER PREVISIONE 5 GIORNI
   =============================== */

function render5DayForecast(data) {
  const forecastHtml = `
    <div class="forecast-5-days">
      <h3>Previsione meteo a 5 giorni</h3>
      <ul>
        ${data.forecast
          .map(
            day => `
              <li>
                <strong>${day.date}</strong> →
                Min: ${day.minTemp}°C |
                Max: ${day.maxTemp}°C
              </li>
            `
          )
          .join('')}
      </ul>
    </div>
  `;

  // ✅ aggiunge il forecast sotto il meteo corrente
  output.innerHTML += forecastHtml;
}

/* ===============================
   RENDER MESSAGGI
   =============================== */

function renderMessage(message, type) {
  output.innerHTML = `
    <div class="weather-message ${type}">
      ${message}
    </div>
  `;
}