// Login Validation
const userEmail = document.querySelector("#input-email");
const inpPassword = document.querySelector("#input-password");
const logBtn = document.querySelector("#log-btn");

// Check login status while page is loading
document.addEventListener("DOMContentLoaded", checkAuthstatus);

// Login Event

async function login() {
  const userInfo = {
    email: userEmail.value,
    password: inpPassword.value,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  };

  try {
    const response = await fetch(
      "https://portifolio-website.up.railway.app/api/v1/auth/login",
      options
    );
    if (!response.ok) {
      throw new Error("Login failed");
    }
    const data = await response.json();
    const token = data.token;
    localStorage.setItem("jwtToken", token);
    window.location.href = "/ui/admin-panel/admin.html";
  } catch (error) {
    alert("Invalid passoword or email");
  }
}

logBtn.addEventListener("click", (e) => {
  const isValidLogin = validateLogin();

  if (isValidLogin) {
    login();
    clearField();
  }

  e.preventDefault();
});

// check if user is not already Login
function checkAuthstatus() {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    window.location.href = "/ui/admin-panel/admin.html";
  } else {
    return false;
  }
}

function clearField() {
  userEmail.value = "";
  inpPassword.value = "";
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

// Validate Login form
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
