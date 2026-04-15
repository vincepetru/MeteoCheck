const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';

export async function fetchLocation(city) {
  const url = `${GEOCODING_URL}?name=${encodeURIComponent(city)}&count=1&language=it&format=json`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Errore durante la ricerca della città.');
  }

  const data = await response.json();
  const location = data.results?.[0];

  if (!location) {
    throw new Error('Nessuna città trovata con questo nome.');
  }

  return {
    name: location.name,
    country: location.country,
    latitude: location.latitude,
    longitude: location.longitude,
    timezone: location.timezone,
  };
}

export async function fetchForecast(lat, lon) {
  const url = `${FORECAST_URL}?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Errore durante il recupero del meteo.');
  }

  const data = await response.json();

  if (!data.current_weather) {
    throw new Error('Dati meteo non disponibili.');
  }

  return data.current_weather;
}
export async function fetch5DayForecast(latitude, longitude) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_min,temperature_2m_max&timezone=auto`
  );

  if (!response.ok) {
    throw new Error('Errore nel recupero della previsione a 5 giorni');
  }

  return response.json();
}

