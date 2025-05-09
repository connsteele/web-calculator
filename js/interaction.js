import * as calc from "./calculator.js"

const CHAR_OPERATOR = new Set(["+", "-", "*", "/"]);

// Delegate actions depending on the calculator button pressed
function delegateButtons(event){
    const element = event.target;

    // Reject clicks on other UI elements
    if (!element.matches("button"))
        return;

    console.log(`${element.textContent} was clicked`);
}

// Add listeners to the inputs and use event delegation for better performance
const divButtons = document.querySelector(".buttons");
divButtons.addEventListener("click", delegateButtons);