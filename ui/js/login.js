// Login Validation
const userEmail = document.querySelector("#input-email");
const inpPassword = document.querySelector("#input-password");
const logBtn = document.querySelector("#log-btn");

let usermail = "userleandre@gmail.com";
let userPassword = "ally0788!";

logBtn.addEventListener("click", (e) => {
  const isValidLogin = validateLogin();

  if (isValidLogin) {
    console.log(userEmail.value);
    console.log(inpPassword.value);

    if (userEmail.value === usermail && inpPassword.value === userPassword) {
      checkAuthstatus();
      localStorage.setItem("auth_status", "on");
      window.location.href = "/ui/admin-panel/admin.html";
    } else {
      alert("Incorrect email or password. Please try again.");
    }
    clearField();
  }

  e.preventDefault();
});

function checkAuthstatus() {
  let authStatus = localStorage.getItem("auth_status");
  if (authStatus === "on") {
    alert("You're already logged in!");
    window.location.href = "/ui/admin-panel/admin.html";
  } else {
    return false;
  }
}

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
    setError(inpPassword, "Your password is wrong");
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
