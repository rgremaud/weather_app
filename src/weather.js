export { Weather };

class Weather {
  constructor(location, timezone, description, currentDay, futureDays) {
    this.location = location;
    this.timezone = timezone;
    this.description = description;
    this.currentDay = currentDay;
    this.futureDays = futureDays;
  }

}
