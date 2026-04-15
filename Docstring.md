def getWeather(city: str):
    """
    Recupera i dati meteo per una città specificata.

    Args:
        city (str): Nome della città da cercare.

    Returns:
        dict: Oggetto JSON con i campi:
            - city (str): nome della città.
            - country (str): codice o nome del paese.
            - time (str): orario formattato della rilevazione.
            - temperature (str): temperatura formattata.
            - windSpeed (str): velocità del vento formattata.
            - windDirection (str): direzione del vento formattata.
            - weatherCode (int): codice meteo Open-Meteo.
            - isDay (bool): vero se è giorno.

    Example:
        >>> result = getWeather("Rome")
        >>> print(result["temperature"])
        18°C
        >>> print(result["windSpeed"])
        15 km/h
    """
    pass