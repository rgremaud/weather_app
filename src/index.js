import { printData } from "./data.js";

function formClick() {
    const button = document.getElementById("submit")

    button.addEventListener("click", () => {
        // const content = document.getElementById("content");
        // content.innerHTML = "";

        event.preventDefault();
        const input = document.getElementById("location");
        printData(input.value);
        input.value = "";
    })
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
