export { getWeather };

import { Weather } from "./weather.js";
import { printScreen } from "./display.js";

async function getWeather(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=PJU8WEHS4L2P42ZTYH4CS3KUQ`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const formattedData = processWeatherData(data);

    return formattedData;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

function processWeatherData(response) {
  const location = response.resolvedAddress;
  const timezone = response.timezone;
  const description = response.description;
  const days = response.days;

  const dayOne = new Map();
  const futureDays = [];

  console.log("Location: " + location);
  console.log("Timezone: " + timezone);
  console.log("Description: " + description);

  for (let i = 0; i < days.length; i++) {
    if (i === 0) {
      // console logs for testing
      console.log(
        days[i].datetime +
        ": tempmax=" + days[i].tempmax +
        ", tempmin=" + days[i].tempmin +
        ", condition=" + days[i].conditions +
        ", temp=" + days[i].temp +
        ", feels like=" + days[i].feelslike +
        ", dew=" + days[i].dew +
        ", humidity=" + days[i].humidity +
        ", conditions=" + days[i].conditions
      )

      // create hash map items
      dayOne.set('date', days[i].datetime);
      dayOne.set('tempMax', days[i].tempmax);
      dayOne.set('tempMin', days[i].tempmin);
      dayOne.set('condition', days[i].conditions);
      dayOne.set('temp', days[i].temp);
      dayOne.set('feelsLike', days[i].feelslike);
      dayOne.set('dew', days[i].dew);
      dayOne.set('humidity', days[i].humidity);
      dayOne.set('conditions', days[i].conditions);

    } else if (0 < i < days.length) {
      // console log for tracking
      console.log(
        days[i].datetime +
        ": tempmax=" +
        days[i].tempmax +
        ", tempmin=" +
        days[i].tempmin,
        ", condition=" + days[i].conditions,
      );

      // create hash for each day and push onto futureDays
      const day = new Map();
      day.set('date', days[i].datetime);
      day.set('tempMax', days[i].tempmax);
      day.set('tempMin', days[i].tempmin);
      day.set('condition', days[i].conditions);

      futureDays.push(day);
    }
  }

  const weatherData = new Weather(dayOne, futureDays);
  console.log(weatherData);
  printScreen(weatherData);
}

/*
Data needed

Location:
  "address": "cary",
  "timezone": "America/New_York",
  "description": "Cooling down with no rain expected.",

Current day:
    "tempmax": 65,
    "tempmin": 41,
    "temp": 50.2,
    "feelslike": 47.9,
    "dew": 34.3,
    "humidity": 55.1,
    "conditions": "Partially cloudy",

10 day:
show next 10 days:
    "tempmax": 65,
    "tempmin": 41
    "conditions": "Partially cloudy",,

*/
