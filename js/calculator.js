// add function
function add(x, y) {
    return x + y;
}

// subtract function
function subtract(x, y) {
    return x - y;
}

// multiply function
function multiply(x, y) {
    return x * y;
}

// divide function
function divide(x, y) {
    return x / y;
}

// Call the appropriate operator and pass along the arguements
function operator(op, x, y) {
    switch (op) {
        case "+":
            return add(x, y);
            break;
        case "-":
            return subtract(x,y);
            break;
        case "*":
            return multiply(x, y);
            break;
        case "/":
            return divide(x, y);
            break;
        default:
            console.alert("Error, input operator does not exist");
    }
}


// Export functions that need to be called elsewhere
module.exports = {
    add,
    subtract,
    multiply,
    divide,
    operator
};