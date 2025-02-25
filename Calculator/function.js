function calculator(r, u, operation) {
  switch (operation) {
    case "+":
      return r + u;
    case "-":
      return r - u;
    case "*":
      return r * u;
    case "/":
      return u !== 0 ? r / num2 : "not posibble";
    default:
      return "Invalid operation";
  }
}

module.exports = calculator;
