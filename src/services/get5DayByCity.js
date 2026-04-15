
console.log("FORECAST FUNCTION CALLED");
console.log("✅ get5DayForecastByCity caricato");

import { fetchLocation } from '../api/weatherClient.js';
import { fetch5DayForecast } from '../api/weatherClient.js';

export async function get5DayForecastByCity(city) {
    console.log("✅ get5DayForecastByCity chiamata con:", city);
  if (!city || !city.trim()) {
    throw new Error('Nome della città obbligatorio.');
  }

  try {
    // 1. Geocoding
    const location = await fetchLocation(city);
    if (!location?.latitude || !location?.longitude) {
      throw new Error('Dati di localizzazione non validi.');
    }

    // 2. Previsione 5 giorni
    const forecastData = await fetch5DayForecast(
      location.latitude,
      location.longitude
    );

    const { time, temperature_2m_min, temperature_2m_max } =
      forecastData.daily;

    // 3. Struttura dati chiara
    const forecast = time.slice(0, 5).map((date, index) => ({
      date,
      minTemp: temperature_2m_min[index],
      maxTemp: temperature_2m_max[index],
    }));

    return {
      city: location.name,
      country: location.country,
      forecast,
    };
  } catch (error) {
    throw new Error(
      `Impossibile recuperare la previsione per "${city}": ${error.message}`
    );
  }
}