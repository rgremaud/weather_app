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
        /*
        currentDay: 
        Map(9) [[Entries]]
        0 : {"date" => "2025-12-26"}
        1 : {"tempMax" => 59.1}
        2 : {"tempMin" => 46.2}
        3 : {"condition" => "Overcast"}
        4 : {"temp" => 49.2}
        5 : {"feelsLike" => 47.1}
        6 : {"dew" => 35.2}
        7 : {"humidity" => 59.5}
        8 : {"conditions" => "Overcast"}
        */
        Object.entries(this.currentDay).forEach(([key, value]) => {
            const entry = document.createElement("div");
            entry.textContent = `${key}: ${value}`

            parentDiv.appendChild(entry);
        });
    }

    printFutureDays(parentDiv) { 
        // Map(4) {'date' => '2025-12-27', 'tempMax' => 67.9, 'tempMin' => 45.9, 'condition' => 'Partially cloudy'}
        this.futureDays.forEach((day) => {
            console.log(day);
            const newDay = document.createElement("div");
            Object.entries(day).forEach(([key, value]) => {
                const entry = document.createElement("div");
                entry.id = day.date;
                // entry.textContent = `${key}: ${value}`

                newDay.appendChild(entry);
            })
            parentDiv.appendChild(newDay);
        })
    }
}