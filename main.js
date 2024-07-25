/* HTML elements' selections */

let form = document.querySelector("form");
let radioButtons = form.querySelector(".radio-button");
let submitButton = form.querySelector("#submit-button");
let textInputs = form.querySelectorAll("input[type=text], textarea");
let fieldset = form.querySelector("fieldset");
const checkboxError = form.querySelector("#consent-error");
let fieldsetError = fieldset.nextElementSibling;
let successDiv = document.querySelector("#success");
/* validations */
var emailValidation = (email) => {
  console.log(email.value);
  return email.value.includes("@");
};

var inputValidation = (input) => {
  console.log(input.value);
  return input.value !== "";
};

var validate = () => {
  const selectedRadio = fieldset.querySelector('input[name="radio"]:checked');
  const selectedCheckbox = form.querySelector(
    'input[name="consent-input"]:checked'
  );

  textInputs.forEach((textInput) => {
    if (!inputValidation(textInput)) {
      textInput.nextElementSibling.classList.remove("hidden");
      textInput.classList.add("error");
      return false;
    } else {
      textInput.nextElementSibling.classList.add("hidden");
      textInput.classList.remove("error");
    }
    if (textInput.id === "email-input")
      if (!emailValidation(textInput)) {
        textInput.nextElementSibling.textContent =
          "Please enter a valid email address";
        textInput.nextElementSibling.classList.remove("hidden");
        textInput.classList.add("error");
        return false;
      } else {
        textInput.nextElementSibling.classList.add("hidden");
        textInput.classList.remove("error");
      }
  });
  if (selectedRadio === null) {
    fieldsetError.classList.remove("hidden");
    return false;
  } else {
    fieldsetError.classList.add("hidden");
  }

  if (selectedCheckbox === null) {
    checkboxError.classList.remove("hidden");
    return false;
  } else {
    checkboxError.classList.add("hidden");
  }
  return true;
};
var reset = () => {
  const selectedRadio = fieldset.querySelector('input[name="radio"]:checked');
  const selectedCheckbox = form.querySelector(
    'input[name="consent-input"]:checked'
  );
  textInputs.forEach((textInput) => {
    textInput.value = "";
  });
  selectedRadio.checked = false;
  selectedCheckbox.checked = false;
};
var handleClick = (e) => {
  e.preventDefault();
  if (validate()) {
    successDiv.classList.remove("hidden");
    reset();
  }
};

submitButton.addEventListener("click", handleClick);
