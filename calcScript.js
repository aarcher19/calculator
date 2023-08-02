const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys");
const display = document.querySelector(".calculator__display");

keys.addEventListener("click", (e) => {
  // e refers to the specific event happening, i.e. the button that is being clicked
  if (e.target.matches("button")) {
    // if the target (what was clicked) is a button, then run this code
    const key = e.target; //key variable is equell to the button that was clicked i.e. target of the event
    const action = key.dataset.action; //this looks for the data-action on an elimant in the html
    const keyContent = key.textContent; //this pulls the inner text from the button being clicked
    const displayedNum = display.textContent; //this assignes the inner text of the calculator display to a variable
    const previousKeyType = calculator.dataset.previousKeyType;

    // removes the styling from operator numbers after each click
    Array.from(key.parentNode.children).forEach((k) =>
      k.classList.remove("is-depressed")
    );

    if (!action) {
      // append number keys to the display
      if (
        displayedNum === "0" ||
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }
      calculator.dataset.previousKeyType = "number";
    }

    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      // allows for succesive calculation to be done without hitting the equal operator
      if (
        firstValue &&
        operator &&
        previousKeyType !== "operator" &&
        previousKeyType !== "calculate"
      ) {
        const calcValue = calculate(firstValue, operator, secondValue);
        display.textContent = calcValue;
        calculator.dataset.firstValue = calcValue;
      } else {
        calculator.dataset.firstValue = displayedNum;
      }

      calculator.dataset.operator = action;
      key.classList.add("is-depressed"); // adds styling to the operator button
      calculator.dataset.previousKeyType = "operator";
    }

    if (action === "decimal") {
      if (previousKeyType === "operator" || previousKeyType === "calculate") {
        display.textContent = "0.";
      } else if (!displayedNum.includes(".")) {
        display.textContent = displayedNum + ".";
      }
      calculator.dataset.previousKeyType = "decimal";
    }

    if (action === "calculate") {
      let firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      let secondValue = displayedNum;

      if (firstValue) {
        if (previousKeyType === "calculate") {
          firstValue = displayedNum;
          secondValue = calculator.dataset.modValue;
        }
        display.textContent = calculate(firstValue, operator, secondValue);
      }
      calculator.dataset.modValue = secondValue;
      calculator.dataset.previousKeyType = "calculate";
    }

    if (action === "clear") {
      if (key.textContent === "AC") {
        calculator.dataset.firstValue = "";
        calculator.dataset.modValue = "";
        calculator.dataset.operator = "";
        calculator.dataset.previousKeyType = "";
      } else {
        key.textContent = "AC";
      }
      display.textContent = "0";
      calculator.dataset.previousKeyType = "clear";
    }

    if (action !== "clear") {
      const clearButton = calculator.querySelector("[data-action=clear]");
      clearButton.textContent = "CE";
    }
  }
});

const calculate = (n1, operator, n2) => {
  let result = "";

  if (operator === "add") {
    result = parseFloat(n1) + parseFloat(n2);
  } else if (operator === "subtract") {
    result = parseFloat(n1) - parseFloat(n2);
  } else if (operator === "multiply") {
    result = parseFloat(n1) * parseFloat(n2);
  } else if (operator === "divide") {
    result = parseFloat(n1) / parseFloat(n2);
  }
  return result;
};
