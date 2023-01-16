// Login Validation
const userEmail = document.querySelector("#input-email");
const inpPassword = document.querySelector("#input-password");
const logBtn = document.querySelector("#log-btn");

logBtn.addEventListener("click", (e) => {
  const isValidLogin = validateLogin();

  if (isValidLogin) {
    console.log(userEmail.value);
    console.log(inpPassword.value);
    clearField();
  }

  e.preventDefault();
});

const setError = (element, message) => {
  const inputBox = element.parentElement;
  const errorDisplay = inputBox.querySelector(".error");

  errorDisplay.innerText = message;
  inputBox.classList.add("error");
  inputBox.classList.remove("success");
};
const setSuccess = (element) => {
  const inputBox = element.parentElement;
  const errorDisplay = inputBox.querySelector(".error");

  errorDisplay.innerText = "";
  inputBox.classList.add("success");
  inputBox.classList.remove("error");
};
const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateLogin = (e) => {
  let status = false;
  const uEmail = userEmail.value.trim();
  const inptPassword = inpPassword.value.trim();

  if (uEmail === "") {
    setError(userEmail, "Email is required");
    status = false;
  } else if (!isValidEmail(uEmail)) {
    setError(userEmail, "Provide a valid email address");
    status = false;
  } else {
    setSuccess(userEmail);
    status = true;
  }

  if (inptPassword === "") {
    setError(inpPassword, "Password is required");
    status = false;
  } else if (inptPassword.length < 8 || inptPassword.length > 16) {
    setError(inpPassword, "Your password must be between 8 and 16 characters");
    status = false;
  } else {
    setSuccess(inpPassword);
    status = true;
  }
  return status;
};

function clearField() {
  userEmail.value = "";
  inpPassword.value = "";
}
