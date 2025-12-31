export { getWeather };
export { printData };

import { Weather } from "./weather.js";
import { printCurrentDay, printFutureDays, printHeaderData } from "./display.js";

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
      dayOne.set("date", days[i].datetime);
      dayOne.set("tempMax", days[i].tempmax);
      dayOne.set("tempMin", days[i].tempmin);
      dayOne.set("temp", days[i].temp);
      dayOne.set("feelsLike", days[i].feelslike);
      dayOne.set("dew", days[i].dew);
      dayOne.set("humidity", days[i].humidity);
      dayOne.set("conditions", days[i].conditions);
    } else if (0 < i < days.length) {
      const day = new Map();
      day.set("date", days[i].datetime);
      day.set("tempMax", days[i].tempmax);
      day.set("tempMin", days[i].tempmin);
      day.set("condition", days[i].conditions);

      futureDays.push(day);
    }
  }

  const weatherData = new Weather(
    location,
    timezone,
    description,
    dayOne,
    futureDays,
  );

  return weatherData;
}

async function printData(location) {
  try {
    const result = await getWeather(location);
    console.log(result);

    // create location details divs
    const locationDetails = document.getElementById("locationDetails");
    printHeaderData(locationDetails, result);

    // create current day divs
    const currentDay = document.getElementById("currentDay");
    printCurrentDay(currentDay, result);

    // Print future day data to page
    const futureDays = document.getElementById("futureDays");
    printFutureDays(futureDays, result);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
