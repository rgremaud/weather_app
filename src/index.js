// index.js
import "./reset.css";
import "./styles.css";

import { printData } from "./data.js";

function formClick() {
    const button = document.getElementById("submit")

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
        buildTitle(futureWeather, "Future");

        // pull data
        const input = document.getElementById("location");
        printData(input.value);
        input.value = "";
    })
}

function buildTitle(parentDiv, titleText) {
    const title = document.createElement("h1");
    title.textContent = titleText

    parentDiv.appendChild(title);
}

formClick();

/*

Display the information on your webpage!

While you don’t have to, if you wish to display weather icons then there can be a lot of them to import, 
so have a look at the dynamic import() function. Unlike plain template strings without an import, 
Webpack can read dynamic imports and still bundle all the relevant assets.

Add any styling you like!

Optional: add a ‘loading’ component that displays from the time the form is submitted until the information 
comes back from the API. Use DevTools to simulate network speeds.

Push that baby to GitHub and share your solution below!
*/
