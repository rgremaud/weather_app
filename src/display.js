import clearDay from "./assets/clear_day.svg";
import partlyCloudy from "./assets/partly_cloudy.svg";
import rainy from "./assets/rainy.svg";
import cloudy from "./assets/cloudy.svg";
import snowy from "./assets/snowy.svg";
import storm from "./assets/thunderstorm.svg";
import { printData } from "./data.js"

export { getDay, printCurrentDay, printFutureDays, printHeaderData, formClick, buildTitle };


function getDay(jsonDate) {
    const date = new Date(jsonDate);
    const dayOfMonth = date.getDate();
    const index = date.getDay();
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const dayOfWeek = dayNames[index];

    const formattedDate = dayOfWeek + " " + dayOfMonth;
    return formattedDate;
}

function printCurrentDay(parentDiv, weather) {
    const bigTemp = document.createElement("div");
    bigTemp.id = "bigTemp";
    bigTemp.textContent = weather.currentDay.get("temp") + "°";

    const details = document.createElement("div");
    details.id = "currentDetails";

    // create divs / content for right hand box items
    buildLine("date ", weather.currentDay.get("date"), details);
    buildLine(
        "feels like ",
        weather.currentDay.get("feelsLike") + "°",
        details,
    );
    buildLine("high ", weather.currentDay.get("tempMax") + "°", details);
    buildLine("low ", weather.currentDay.get("tempMin") + "°", details);
    buildLine("dew ", weather.currentDay.get("dew") + "°", details);
    buildLine("humidity ", weather.currentDay.get("humidity") + "%", details);

    parentDiv.appendChild(bigTemp);
    parentDiv.appendChild(details);
}

function buildLine(firstPartText, secondPartText, parentDiv) {
    const line = document.createElement("div");
    line.className = "currentWeatherLine";

    const firstPartDiv = document.createElement("div");
    firstPartDiv.textContent = firstPartText;
    firstPartDiv.className = "firstPart";

    const secondPartDiv = document.createElement("div");
    secondPartDiv.textContent = secondPartText;
    secondPartDiv.className = "secondPart";

    line.appendChild(firstPartDiv);
    line.appendChild(secondPartDiv);

    parentDiv.appendChild(line);
}

function printFutureDays(parentDiv, weather) {
    const tenDayForecast = document.createElement("div");
    tenDayForecast.id = "tenDay";

    weather.futureDays.forEach((day) => {
        if (
            weather.futureDays.indexOf(day) >= 1 &&
            weather.futureDays.indexOf(day) <= 10
        ) {
            const newDay = document.createElement("div");
            newDay.className = "day";

            for (const [key, value] of day) {
                if (key === "date") {
                    const entry = document.createElement("div");
                    entry.textContent = getDay(value);
                    entry.style.fontWeight = "600";

                    newDay.appendChild(entry);
                } else if (key === "tempMax" || key === "tempMin") {
                    const entry = document.createElement("div");
                    entry.textContent = `${value}` + "°";

                    newDay.appendChild(entry);
                } else if (key === "condition") {
                    if (value === "Partially cloudy") {
                        svgImage(newDay, partlyCloudy, value);
                    } else if (value === "Clear") {
                        svgImage(newDay, clearDay, value);
                    } else if (value.includes("Rain")) {
                        svgImage(newDay, rainy, value);
                    } else if (value === "Overcast") {
                        svgImage(newDay, cloudy, value);
                    } else if (value.includes("Snow")) {
                        svgImage(newDay, snowy, value);
                    } else if (value.includes("Thunder") || value.includes("thunder") || value.includes("storm") || value.includes("Storm")) {
                        svgImage(newDay, storm, value);
                    } else {
                        const entry = document.createElement("div");
                        entry.textContent = `${value}`;

                        newDay.appendChild(entry);
                    }
                }
            }
            tenDayForecast.appendChild(newDay);
        }
    });

    parentDiv.appendChild(tenDayForecast);
}

function printHeaderData(parentDiv, weather) {
    const locationSearch = document.createElement("h1");
    locationSearch.textContent = weather.location;

    parentDiv.appendChild(locationSearch);
}

function svgImage(parentDiv, svgSrc, value) {
    const entry = document.createElement("div");
    const svg = document.createElement("img");
    svg.src = svgSrc;
    svg.alt = `${value}`;

    entry.appendChild(svg);
    parentDiv.appendChild(entry);
}

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
