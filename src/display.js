/*

const valentines = new Date("1995-02-14");
const day = valentines.getDay();
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

console.log(dayNames[day]); // "Monday"

*/

export { getDay }

function getDay(jsonDate) {
    const date = new Date(jsonDate);
    const dayOfMonth = date.getDate();
    const index = date.getDay();
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const dayOfWeek = dayNames[index];

    const formattedDate = dayOfWeek + " " + dayOfMonth;
    return formattedDate;
}
