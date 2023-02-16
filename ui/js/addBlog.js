let editor = new FroalaEditor("#subject", {
  heightMax: 200,
});
// const token = localStorage.getItem("jwtToken");
const alert = document.getElementById("alert");
const blogTitle = document.querySelector("#blog-title");
const blogContent = document.querySelector("#subject");
const blogImage = document.querySelector("#blog-image");
const publishBtn = document.querySelector("#publish-btn");

// console.log(token);

publishBtn.addEventListener("click", (e) => {
  const isblogValid = validatArticle();
  // const isFildValid = validateFileType();

  if (isblogValid) {
    storeArticle();
    // clear fields
    clearFields();
  }
  e.preventDefault();
});

async function storeArticle() {
  showLoader();
  const formData = new FormData();
  const selectedFile = blogImage.files[0];

  formData.append("blogTitle", blogTitle.value);
  formData.append("blogContent", blogContent.value);
  formData.append("picture", selectedFile);

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  };
  showLoader();
  try {
    const response = await fetch(
      "https://portifolio-website.up.railway.app/api/v1/blogs",
      options
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    showAlert("Blog post created successfully");
  } catch (error) {
    console.error("Error creating blog post:", error);
    showAlert("Something went wrong ..!");
  } finally {
    hideLoader();
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

const validatArticle = () => {
  let status = true;
  const blogT = blogTitle.value.trim();
  const blogCont = blogContent.value.trim();
  if (blogT === "") {
    setError(blogTitle, "Title is required");
    status = false;
  } else if (blogT.length < 10) {
    setError(blogTitle, "Your title must be greater than 10 letters");
    status = false;
  } else {
    setSuccess(blogTitle);
  }

  if (blogCont === "") {
    setError(blogContent, "content is required");
    status = false;
  } else if (blogCont.length < 10) {
    setError(blogContent, "Your content must greater than 10 letters");
    status = false;
  } else {
    setSuccess(blogContent);
  }

  return status;
};
// const fileInput = document.getElementById("blog-image");
function clearFields() {
  blogTitle.value = "";
  editor.html.set("");
  blogImage.value = "";
  // fileInput.value = null;
}

function validateFileType() {
  let inputElement = document.getElementById("blog-image");
  let files = inputElement.files;
  if (files.length == 0) {
    alert("file is required");
    return false;
  } else {
    let filename = files[0].name;

    let extension = filename.substr(filename.lastIndexOf("."));

    let allowedExtensionsRegx = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

    let isAllowed = allowedExtensionsRegx.test(extension);

    if (isAllowed) {
      alert("File type is valid for the upload");
      fileInput.value = null;
      /* file upload logic goes here... */
    } else {
      alert("Invalid File Type.");
      return false;
    }
  }
}

function getCurrentDate() {
  let date = new Date();
  let month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let formDate =
    month[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
  // console.log(formDate);

  return formDate;
}

function showLoader() {
  document.getElementById("loader-overlay").style.display = "block";
  document.body.style.overflow = "hidden";
}

function hideLoader() {
  document.getElementById("loader-overlay").style.display = "none";
  document.body.style.overflow = "auto";
}

const showAlert = (message) => {
  alert.innerHTML = message;
  alert.classList.add("show");
  setTimeout(function () {
    alert.classList.remove("show");
  }, 5000);
};
