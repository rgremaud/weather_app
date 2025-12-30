export { Weather };

import { getDay } from "./display.js"

class Weather {
    constructor(location, timezone, description, currentDay, futureDays) {
        this.location = location;
        this.timezone = timezone;
        this.description = description;
        this.currentDay = currentDay;
        this.futureDays = futureDays;
    }

    printCurrentDay(parentDiv) {
        const currentDayDiv = document.getElementById("currentDay");

        const bigTemp = document.createElement("div");
        bigTemp.id = "bigTemp";
        bigTemp.textContent = this.currentDay.get("temp") + "°";

        const details = document.createElement("div");
        details.id = "currentDetails";

        // create divs / content for right hand box items
        this.buildLine("date ", this.currentDay.get("date"), details);
        this.buildLine(
            "feels like ",
            this.currentDay.get("feelsLike") + "°",
            details,
        );
        this.buildLine("high ", this.currentDay.get("tempMax") + "°", details);
        this.buildLine("low ", this.currentDay.get("tempMin") + "°", details);
        this.buildLine("dew ", this.currentDay.get("dew") + "°", details);
        this.buildLine("humidity ", this.currentDay.get("humidity") + "%", details);

        parentDiv.appendChild(bigTemp);
        parentDiv.appendChild(details);
    }

    buildLine(firstPartText, secondPartText, parentDiv) {
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

    printFutureDays(parentDiv) {
        const tenDayForecast = document.createElement("div");
        tenDayForecast.id = "tenDay";

        /*
    {"date" => "2025-12-30"}
    {"tempMax" => 42}
    {"tempMin" => 27}
    {"condition" => "Clear"}
        */
        this.futureDays.forEach((day) => {
            if (this.futureDays.indexOf(day) >= 1 && this.futureDays.indexOf(day) <= 10) {
                const newDay = document.createElement("div");
                newDay.className = "day"

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
                    } else {
                        const entry = document.createElement("div");
                        entry.textContent = `${value}`;

                        newDay.appendChild(entry);
                    }
                }
                tenDayForecast.appendChild(newDay);
            }
        });

        parentDiv.appendChild(tenDayForecast);
    }

    printHeaderData(parentDiv) {
        const locationSearch = document.createElement("h1");
        locationSearch.textContent = this.location;

        // const timezone = document.createElement("div");
        // timezone.textContent = "Timezone: " + this.timezone;

        // const description = document.createElement("div");
        // description.textContent = "Description: " + this.description;

        parentDiv.appendChild(locationSearch);
        // parentDiv.appendChild(timezone);
        // parentDiv.appendChild(description);
    }
}
