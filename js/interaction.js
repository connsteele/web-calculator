import * as calc from "./calculator.js"

const CHAR_OPERATOR = new Set(["+", "-", "*", "/"]);

let expression = {
    a : "",
    b : "",
    operator : ""
}

// Delegate actions depending on the calculator button pressed
function delegateButtons(event){
    const element = event.target;

    // Reject clicks on other UI elements
    if (!element.matches("button"))
        return;

    const content = element.textContent;
    // console.log(`${content} was clicked`);

    // Check for computation request
    if (element.id === "compute")
    {
        // expression is valid
        if (expression.a != "" && expression.b != "" && expression.operator != "")
        {
            const result = calc.operator(expression.operator, +expression.a, +expression.b);
            // Setup the expression for the next computation
            expression.a = result;
            expression.b = "";
            expression.operator = "";
            const update = new CustomEvent("update", {
                bubbles : true
                }
            );
            element.dispatchEvent(update);
            return;
        }
        else
        {
            // Error
        }
        
    }

    // Update the expression based on input
    if (element.classList.contains("operator"))
    {
        expression.operator = content;
    }
    else if (element.classList.contains("operand")) // operand
    {
        // update the first operand
        if (expression.operator == "" || expression.a === "") {
            if (expression.a === 0 || expression.a === "")
                expression.a = content;
            else
                expression.a += content;
        }
        // update the second operand
        else {
            if (expression.b === 0 || expression.b === "")
                expression.b = content;
            else
                expression.b += content;
        }
    }



    // Send off a custom event to update the display of the calculator
    const update = new CustomEvent("update", {
        bubbles : true
        }
    );
    element.dispatchEvent(update);

}

// Update the calculators display to reflect input from user. Triggered by custom event.
function updateDisplay(event) {
    const display = document.querySelector(".display");    

    // if the display has 0 then just use the new value
    // if not then the input needs to build
    display.textContent = `${expression.a}${expression.operator}${expression.b}`;
    
}



//------- Actions to run on startup

// Add listeners to the inputs and use event delegation for better performance
const divButtons = document.querySelector(".buttons");
divButtons.addEventListener("click", delegateButtons);
divButtons.addEventListener("update", updateDisplay);