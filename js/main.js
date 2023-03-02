const form = document.getElementById("form");

const nameInput = document.getElementById("name");
const surnameInput = document.getElementById("surname");
const emailInput = document.getElementById("email");
const dateInput = document.getElementById("date");

const myValidator = new Validator([
  {
    input: nameInput,
    rules: [Validator.isRequired],
    errorMessage: "Name is not valid",
  },
  {
    input: surnameInput,
    rules: [Validator.isRequired],
    errorMessage: "Surname is not valid",
  },
  {
    input: emailInput,
    rules: [Validator.isRequired, Validator.isEmail],
    errorMessage: "Email is not valid",
  },
  {
    input: dateInput,
    rules: [Validator.isRequired, Validator.isDate],
    errorMessage: "Date must be in dd-mm-yyyy format",
  },
]);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  removesAllErrorElements();
  const validationResult = myValidator.validate();
  validationResult.forEach((inputValidationResult) => {
    if (inputValidationResult.success === false) {
      generateErrorElement(
        inputValidationResult.input,
        inputValidationResult.errorMessage
      );
    }
  });
});
function removesAllErrorElements() {
  const errorElements = document.querySelectorAll(".error");
  errorElements.forEach((errorElement) => {
    errorElement.remove();
  });
}
function generateErrorElement(input, errorMessage) {
  const errorElement = document.createElement("div");
  errorElement.classList.add("error");
  errorElement.textContent = errorMessage;
  input.parentElement.appendChild(errorElement);
}
