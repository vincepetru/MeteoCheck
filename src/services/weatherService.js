import { fetchLocation, fetchForecast } from '../api/weatherClient.js';
import { formatTemperature, formatDateTime } from '../utils/formatters.js';
import { getCacheWithExpiry, setCacheWithExpiry } from '../utils/cache.js';

const CACHE_TTL = 10 * 60 * 1000; // 10 minuti

export async function getWeatherByCity(city) {
  if (!city || !city.trim()) {
    throw new Error('Nome della città è obbligatorio.');
  }

  const cacheKey = `weather_${city.toLowerCase()}`;

  // ✅ Tentativo da cache
  const cached = getCacheWithExpiry(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const location = await fetchLocation(city);
    if (!location?.latitude || !location?.longitude) {
      throw new Error('Dati di localizzazione non validi.');
    }

    const forecast = await fetchForecast(
      location.latitude,
      location.longitude
    );
    if (!forecast?.time || forecast.temperature == null) {
      throw new Error('Dati meteo non disponibili.');
    }

    const { name, country } = location;
    const {
      temperature,
      windspeed,
      winddirection,
      weathercode,
      time,
      is_day,
    } = forecast;

    const result = {
      city: name,
      country,
      time: formatDateTime(time),
      temperature: formatTemperature(temperature),
      windSpeed: windspeed,
      windDirection: winddirection,
      weatherCode: weathercode,
      isDay: is_day === 1,
    };

    // ✅ Salvataggio in cache
    setCacheWithExpiry(cacheKey, result, CACHE_TTL);

    return result;
  } catch (error) {
    throw new Error(
      `Impossibile recuperare il meteo per "${city}": ${error.message}`
    );
  }
}
