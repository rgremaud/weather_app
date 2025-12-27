/*

Display current weather:

"feelslikemax": 

show next 10 days:
    - low
    - high
    - conditions

*/

export { printScreen }

function printScreen(weatherData) {
    const currentDay = document.getElementById("currentDay");
    const futureDays = document.getElementById("futureDays");

    weatherData.printCurrentDay(currentDay);
    weatherData.printFutureDays(futureDays);
}