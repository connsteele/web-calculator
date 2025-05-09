import * as calc from "./calculator.js"

const CHAR_OPERATOR = new Set(["+", "-", "*", "/"]);

// Delegate actions depending on the calculator button pressed
function delegateButtons(event){
    const element = event.target;

    // Reject clicks on other UI elements
    if (!element.matches("button"))
        return;

    const content = element.textContent;
    console.log(`${content} was clicked`);

    // Send off a custom event to update the display of the calculator
    const update = new CustomEvent("update", {
        bubbles : true,
        detail : {value : content}
        }
    );
    element.dispatchEvent(update);

}

// Update the calculators display to reflect input from user. Triggered by custom event.
function updateDisplay(event) {
    const value = event.detail.value; 
    console.log("Display updated");
    console.log(`${value}`)

    const display = document.querySelector(".display");
    display.textContent = value;
    // if the value is 0 then just use the new value
    // if not then the input needs to build
}



//------- Actions to run on startup

// Add listeners to the inputs and use event delegation for better performance
const divButtons = document.querySelector(".buttons");
divButtons.addEventListener("click", delegateButtons);
divButtons.addEventListener("update", updateDisplay);