export { getWeather };

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

  console.log("Location: " + location);
  console.log("Timezone: " + timezone);
  console.log("Description: " + description);


// doesn't work - need to break out first day vs other days
  for (let i = 0; i < days.length; i++) {
    if (i = 0) {
    console.log(
        days[i].datetime +
        ": tempmax=" +
        days[i].tempmax +
        ", tempmin=" +
        days[i].tempmin,
      ", condition=" + days[i].conditions, + 
      ", temp=" + days[i].temp,
      ", feelslike=" + days[i].feelslike,
      ", dew=" + days[i].dew,
      ", humidity=" + days[i].humidity,
      ", conditions=" + days[i].conditions
    )
    } else if (0 < i < days.length) { 
    console.log(
      days[i].datetime +
        ": tempmax=" +
        days[i].tempmax +
        ", tempmin=" +
        days[i].tempmin,
      ", condition=" + days[i].conditions,
    ); }
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
