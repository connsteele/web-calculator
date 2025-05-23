import * as calc from "./calculator.js"

const CHAR_OPERATOR = new Set(["+", "-", "*", "/"]);
const MAX_DECIMAL = 4; // The maximum decimal places any operand can have

let expression = {
    a : "",
    b : "",
    operator : ""
}

// Return boolean with result depending if arguement is decimal or not
function isDecimal (number) {
    return (number % 1) != 0;
}

// Function that sets the expression back to a default state
function resetExpression() {
    expression.a = 0;
    expression.b = "";
    expression.operator = "";

    // Dispatch an update event
    const update = new CustomEvent("update", {
        bubbles : true    
    });
    const buttons = document.querySelector(".buttons");
    buttons.dispatchEvent(update);

    return;
}

// On = button press this function will run
function computeKey () {
    // expression is valid
    if (expression.a != "" && expression.b != "" && expression.operator != "")
    {
        let result = calc.operator(expression.operator, +expression.a, +expression.b);
        // Check if the user tried to divide by 0
        if (result === undefined) {
            alert("Error, cannot divide by 0");
            resetExpression();
            return;
        }

        // Check for decimal and round if too long
        if (isDecimal(result)){
            const splitResult = result.toString().split("");
            const search = ".";
            const indexDecimal = splitResult.indexOf(search);
            let roundFix = "1";
            // Dynamic way to generate numbers to correct decimal rounding
            for (let i = 0 ; i < MAX_DECIMAL ; i++)
            {
                roundFix += "0";
            }
            roundFix = +roundFix;
            result = splitResult.length - indexDecimal - 1 > MAX_DECIMAL ? 
                Math.round(result * roundFix) / roundFix : result;
        }

        // Setup the expression for the next computation
        expression.a = result;
        expression.b = "";
        expression.operator = "";
        const update = new CustomEvent("update", {
            bubbles : true
            }
        );
        const element = document.querySelector(".buttons");
        element.dispatchEvent(update);
        return;
    }
    else
    {
        // Error
    }
}

// On = button press this will run
function computeButton(element) {
    // expression is valid
    if (expression.a != "" && expression.b != "" && expression.operator != "")
    {
        let result = calc.operator(expression.operator, +expression.a, +expression.b);
        // Check if the user tried to divide by 0
        if (result === undefined) {
            alert("Error, cannot divide by 0");
            resetExpression();
            return;
        }

        // Check for decimal and round if too long
        if (isDecimal(result)){
            const splitResult = result.toString().split("");
            const search = ".";
            const indexDecimal = splitResult.indexOf(search);
            let roundFix = "1";
            // Dynamic way to generate numbers to correct decimal rounding
            for (let i = 0 ; i < MAX_DECIMAL ; i++)
            {
                roundFix += "0";
            }
            roundFix = +roundFix;
            result = splitResult.length - indexDecimal - 1 > MAX_DECIMAL ? 
                Math.round(result * roundFix) / roundFix : result;
        }

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

// Delegate actions depending on what key the users presses.
function delegateKeys(event){
    const key = event.key;

    // Reject input from keys that are not valid
    if (CHAR_OPERATOR.has(key))
    {
        expression.operator = key;
    }
    else if (Number.isInteger(+key) || key === ".")
    {
        // update the first operand
        if (expression.operator == "" || expression.a === "") {
            if (key === "." && !expression.a.includes(".")) {
                const decAdd = expression.a === "" ? "0." : ".";
                expression.a += decAdd;
            }
            else if ((expression.a === 0 || expression.a === "") && key != ".")
                expression.a = key;
            else if (key != ".")
                expression.a += key;
        }
        // update the second operand
        else {
            if (key === "." && !expression.b.includes(".")) {
                const decAdd = expression.a === "" ? "0." : ".";
                expression.b += decAdd;
            }
            else if ((expression.b === 0 || expression.b === "") && key != ".")
                expression.b = key;
            else if (key != ".")
                expression.b += key;
        }
    }
    else if (key == "=")
    {
        // Compute
        computeKey();
    }
    else
        return; // Invalid keypress
 


    // Send off a custom event to update the display of the calculator
    const update = new CustomEvent("update", {
        bubbles : true
        }
    );
    const element = document.querySelector(".buttons");
    element.dispatchEvent(update);

}

// Delegate actions depending on the calculator button pressed
function delegateButtons(event){
    const element = event.target;

    // Reject clicks on other UI elements
    if (!element.matches("button"))
        return;

    const content = element.textContent;
    // console.log(`${content} was clicked`);

    // Check for a clear request
    if (element.id === "clear") {
        resetExpression();       
        return;
    }

    // Check for computation request
    if (element.id === "compute") {
        computeButton(element);
    }

    // Update the expression based on input
    if (element.classList.contains("operator"))
    {
        expression.operator = content;
    }
    else if (element.classList.contains("operand") || element.id === "decimal") // operand or decimal
    {
        // update the first operand
        if (expression.operator == "" || expression.a === "") {
            if (element.id === "decimal" && !expression.a.includes(".")) {
                const decAdd = expression.a === "" ? "0." : ".";
                expression.a += decAdd;
            }
            else if ((expression.a === 0 || expression.a === "") && element.id != "decimal")
                expression.a = content;
            else if (element.id != "decimal")
                expression.a += content;
        }
        // update the second operand
        else {
            if (element.id === "decimal" && !expression.b.includes(".")) {
                const decAdd = expression.a === "" ? "0." : ".";
                expression.b += decAdd;
            }
            else if ((expression.b === 0 || expression.b === "") && element.id != "decimal")
                expression.b = content;
            else if (element.id != "decimal")
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
window.addEventListener("keypress", delegateKeys);
divButtons.addEventListener("update", updateDisplay);