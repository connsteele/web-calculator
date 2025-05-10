// add function
export function add(x, y) {
    return x + y;
}

// subtract function
export function subtract(x, y) {
    return x - y;
}

// multiply function
export function multiply(x, y) {
    return x * y;
}

// divide function
export function divide(x, y) {
    if (y === 0)
        return undefined;
    return x / y;
}

// Call the appropriate operator and pass along the arguements
export function operator(op, x, y) {
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