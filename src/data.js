export { getWeather };
export { printData };

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
    // rework so this returns your object
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

  for (let i = 0; i < days.length; i++) {
    if (i === 0) {
      dayOne.set('date', days[i].datetime);
      dayOne.set('tempMax', days[i].tempmax);
      dayOne.set('tempMin', days[i].tempmin);
      dayOne.set('temp', days[i].temp);
      dayOne.set('feelsLike', days[i].feelslike);
      dayOne.set('dew', days[i].dew);
      dayOne.set('humidity', days[i].humidity);
      dayOne.set('conditions', days[i].conditions);

    } else if (0 < i < days.length) {
      const day = new Map();
      day.set('date', days[i].datetime);
      day.set('tempMax', days[i].tempmax);
      day.set('tempMin', days[i].tempmin);
      day.set('condition', days[i].conditions);

      futureDays.push(day);
    }
  }

  const weatherData = new Weather(location, timezone, description, dayOne, futureDays);
  
  return weatherData;
}

async function printData(location) {
  try {
    const result = await getWeather(location);
    console.log(result); 
    const currentDayData = result.currentDay
    
    const content = document.getElementById("display");
    // create header divs
    const searchItem = document.createElement("div");
    searchItem.textContent = "Location: " + result.location;

    const timezone = document.createElement("div");
    timezone.textContent = "Timezone: " + result.timezone;

    const description = document.createElement("div");
    description.textContent = "Description: " + result.description;

    const currentDay = document.createElement("div");

    // testing iterating over currentDayData
    for (const [key, value] of currentDayData) {
        const entry = document.createElement("div");
        entry.textContent = `${key}: ${value}`

        currentDay.appendChild(entry);
    }
    
    
    // const futureDays = document.createElement("div");
    // futureDays.textContent = result.futureDays;

    content.appendChild(searchItem);
    content.appendChild(timezone);
    content.appendChild(description);
    content.appendChild(currentDay);
    // content.appendChild(futureDays);

  } catch (error) {
    console.error("An error occurred:", error);
  }
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
