# My Weather App

Semplice app meteo che consente agli utenti di inserire il nome di una città e recuperare **il meteo corrente** e **la previsione meteo a 5 giorni** tramite l'API Open-Meteo.

## Panoramica del progetto

Questa app usa l'API di geocoding di Open-Meteo per trasformare un nome di città in coordinate geografiche, quindi chiama l'API forecast per ottenere:

- i dati meteo correnti (temperatura, vento, giorno/notte);
- la previsione meteo giornaliera a 5 giorni (temperature minime e massime).

L'app gestisce gli errori di input non valido e le risposte API mancanti.
La logica è organizzata in modo modulare, separando client API, servizi applicativi e interfaccia utente.

## Installazione

1. Clona il repository:
```bash
git clone <url-del-repository>
cd my-weather-app
```

2. Avvia un server locale nella cartella del progetto. Ad esempio con Python:
```bash
cd public
python -m http.server 8000
```

3. Apri il browser su http://localhost:8000.

Se usi VS Code Live Server o un altro server che gira su porta 5500, usa invece:
http://127.0.0.1:5500/public/index.html

## Guida all'uso

1. Apri l'app nel browser.
2. Inserisci il nome della città nella casella di testo.
3. Premi il pulsante "Cerca meteo".
4. I risultati verranno mostrati nella pagina, includendo:
   - il meteo corrente;
   - la previsione meteo a 5 giorni.

## Output di esempio

```text
Città: Roma
Temperatura: 23°C
Velocità del vento: 6.9 km/h
Giorno: Sì

Previsione meteo a 5 giorni:
2026-04-15 → Min: 14.7°C | Max: 22.8°C
2026-04-16 → Min: 15.0°C | Max: 24.4°C
2026-04-17 → Min: 13.6°C | Max: 26.0°C
2026-04-18 → Min: 15.4°C | Max: 25.6°C
2026-04-19 → Min: 13.9°C | Max: 25.1°C
```

In caso di errore:

```text
Errore: Città non trovata
```

## Funzionalità

- Ricerca meteo per nome città.
- Recupero del meteo corrente tramite Open-Meteo.
- Visualizzazione della previsione meteo giornaliera a 5 giorni.
- Recupero dati senza necessità di chiave API.
- Gestione degli errori per città non valide.
- Supporto per risposte API incomplete o non valide.
- Struttura modulare con API client, servizi e UI separati.

## Miglioramenti futuri

- Aggiungere il supporto per previsioni orarie.
- Mostrare un'icona meteo e una descrizione più dettagliata.
- Implementare caching locale delle richieste per ridurre i tempi di caricamento.
- Migliorare la formattazione delle date (giorno della settimana).
- Aggiungere un'interfaccia mobile-friendly più ricca.

## Licenza

Progetto a scopo didattico.
Dati forniti da Open-Meteo.
