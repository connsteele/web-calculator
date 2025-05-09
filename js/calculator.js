// UMD wrapper allows for CommonJS or Browser for registering the module correctly
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    // Node / Jest
    module.exports = factory();
  } else {
    // Browser global
    root.calc = factory();
  }
}(
  typeof self !== 'undefined' ? self : this,
  function () {
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

    return { add, subtract, multiply, divide, operator };
  }
));
