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

    /*
    // create location details divs
    const locationDetails = document.getElementById("locationDetails");

    const locationSearch = document.createElement("div");
    locationSearch.textContent = "Location: " + result.location;

    const timezone = document.createElement("div");
    timezone.textContent = "Timezone: " + result.timezone;

    const description = document.createElement("div");
    description.textContent = "Description: " + result.description;

    locationDetails.appendChild(locationSearch);
    locationDetails.appendChild(timezone);
    locationDetails.appendChild(description);
    */

    printHeaderData(parentDiv) { 
        const locationSearch = document.createElement("div");
        locationSearch.textContent = "Location: " + this.location;

        const timezone = document.createElement("div");
        timezone.textContent = "Timezone: " + this.timezone;

        const description = document.createElement("div");
        description.textContent = "Description: " + this.description;

        parentDiv.appendChild(locationSearch);
        parentDiv.appendChild(timezone);
        parentDiv.appendChild(description);
    }
}