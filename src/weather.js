export { Weather };

class Weather {
    constructor(location, timezone, description, currentDay, futureDays) {
        this.location = location;
        this.timezone = timezone;
        this.description = description;
        this.currentDay = currentDay;
        this.futureDays = futureDays;
    }

    printCurrentDay(parentDiv) {
        const dayDiv = document.createElement("div");

        for (const [key, value] of this.currentDay) {
            const entry = document.createElement("div");
            entry.textContent = `${key}: ${value}`

            dayDiv.appendChild(entry);
        }
        parentDiv.appendChild(dayDiv);
    }

    printCurrentDayTest(parentDiv) {
        /* rework as follows: (anything in single quotes is key)
           Current - 'date'
           left hand side: 
           'temp' as large number degrees.  show F / C next w/option to convert between two 
           right hand side:
           'date'
           'feelsLike'
           'tempMax'
           'tempMin'
           'dew'
           'humidity'
           
       */
        const currentDayDiv = document.getElementById("currentDay");

        const bigTemp = document.createElement("div");
        bigTemp.id = "bigTemp";
        bigTemp.textContent = this.currentDay.get('temp') + "°";

        const details = document.createElement("div")
        details.id = "currentDetails";

        for (const [key, value] of this.currentDay) {
            if (key !== 'date') {
                const entry = document.createElement("div");
                entry.textContent = `${value}`

                details.appendChild(entry);
            }
        }

        parentDiv.appendChild(bigTemp);
        parentDiv.appendChild(details);
    }

    printFutureDays(parentDiv) {
        this.futureDays.forEach((day) => {
            const newDay = document.createElement("div");
            for (const [key, value] of day) {
                const entry = document.createElement("div");
                entry.textContent = `${key}: ${value}`

                newDay.appendChild(entry);
            }
            parentDiv.appendChild(newDay);
        })
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