const calc = require("./calculator");

describe("add", () => {
    test('adds 1 and 2', () => {
        expect(calc.add(1, 2)).toBe(3);
    });

    test('adds 100 and 2222', () => {
        expect(calc.add(100, 2222)).toBe(100 + 2222);
    });

});

describe("subtract", () => {
    test('subtract 2 from 1', () => {
        expect(calc.subtract(1, 2)).toBe(1 - 2);
    });

    test('subtract 2222 from 100', () => {
        expect(calc.subtract(100, 2222)).toBe(100 - 2222);
    });

});

describe("multiply", () => {
    test('multiply 1 and 2', () => {
        expect(calc.multiply(1, 2)).toBe(1 * 2);
    });

    test('multiply 100 and 2222', () => {
        expect(calc.multiply(100, 2222)).toBe(100 * 2222);
    });

});

describe("divide", () => {
    test('divide 2 from 1', () => {
        expect(calc.divide(1, 2)).toBe(1 / 2);
    });

    test('divide 2222 from 100', () => {
        expect(calc.divide(100, 2222)).toBe(100 / 2222);
    });

});

describe("operator", () => {
    test(`operator("+", 3, 4)`, () => {
        expect(calc.operator("+", 3, 4)).toBe(3 + 4);
    });
    test(`operator("-", 3, 4)`, () => {
        expect(calc.operator("-", 3, 4)).toBe(3 - 4);
    });
    test(`operator("*", 3, 4)`, () => {
        expect(calc.operator("*", 3, 4)).toBe(3 * 4);
    });
    test(`operator("/", 3, 4)`, () => {
        expect(calc.operator("/", 3, 4)).toBe(3 / 4);
    });
});