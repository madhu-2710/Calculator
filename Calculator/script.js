class Calculator {
  constructor(previousOperandButton, currentOperandButton) {
    this.previousOperandButton = previousOperandButton;
    this.currentOperandButton = currentOperandButton;
    this.clear();
  }
  clear() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = undefined;
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  appendNumbers(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand != "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(current) && !isNaN(prev)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = " ";
  }
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split("."))[0];
    const floatNumber = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (floatNumber != null) {
      return `${integerDigits}.${floatNumber}`;
    } else {
      return integerDigits;
    }
  }
  updateDisplay() {
    this.currentOperandButton.innerText = this.currentOperand;
    if (this.operation != null) {
      this.previousOperandButton.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
      this.previousOperandButton.innerText = "";
    }
  }
}

const numberButton = document.querySelectorAll("[data-number]");
const operationButton = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equals]");
const clearButton = document.querySelector("[data-clear]");
const previousOperandButton = document.querySelector(
  "[data-previous-operand ]"
);
const currentOperandButton = document.querySelector("[data-current-operand ]");
const deleteButton = document.querySelector("[data-delete]");

const calculator = new Calculator(previousOperandButton, currentOperandButton);

numberButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumbers(button.innerText);
    calculator.updateDisplay();
  });
});

operationButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

clearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
