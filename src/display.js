/*

Rework this to apply styling for the data functions

*/

function currentDayStyling(currentDay) {
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
    bigTemp.textContent = currentDay.get('temp');

    const details = document.createElement("div")
    details.id = "currentDetails";

    currentDayDiv.appendChild(bigTemp);
    currentDayDiv.appendChild(details);

}