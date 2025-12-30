// index.js
import "./reset.css";
import "./styles.css";

import { printData } from "./data.js";

function formClick() {
  const button = document.getElementById("submit");

  button.addEventListener("click", () => {
    event.preventDefault();

    // assign constant to location details, current weather and future weather
    const locationDetails = document.getElementById("locationDetails");
    const currentWeather = document.getElementById("currentDay");
    const futureWeather = document.getElementById("futureDays");

    // clear any existing content
    locationDetails.textContent = "";
    currentWeather.textContent = "";
    futureWeather.textContent = "";

    // build new titles
    // buildTitle(locationDetails, "Location");
    // buildTitle(currentWeather, "Current");
    buildTitle(futureWeather, "10-Day Weather Forecast");

    // pull data
    const input = document.getElementById("location");
    printData(input.value);
    input.value = "";
  });
}

function buildTitle(parentDiv, titleText) {
  const title = document.createElement("h1");
  title.textContent = titleText;

  parentDiv.appendChild(title);
}

formClick();
