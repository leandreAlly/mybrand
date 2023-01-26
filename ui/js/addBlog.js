let editor = new FroalaEditor("#subject", {
  heightMax: 200,
});

const blogTitle = document.querySelector("#blog-title");
const blogContent = document.querySelector("#subject");
const blogImage = document.querySelector("#blog-image");
const publishBtn = document.querySelector("#publish-btn");

// const selectedFile = blogImage.files[0];
// const reader = new FileReader();

publishBtn.addEventListener("click", (e) => {
  const isblogValid = validatArticle();
  // const isFildValid = validateFileType();

  if (isblogValid) {
    const selectedFile = blogImage.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      let newId = Math.floor(Math.random() * (1000000 - 100000) + 100000);
      const data = {
        id: newId,
        title: blogTitle.value,
        blogContent: blogContent.value,
        date: getCurrentDate(),
        image: reader.result,
      };
      console.log(data);
      storeArticleInLocalStorage(data);
      // clear fields
      clearFields();
    };
  }

  e.preventDefault();
});

function storeArticleInLocalStorage(article) {
  let articles;
  if (localStorage.getItem("articles") === null) {
    articles = [];
  } else {
    articles = JSON.parse(localStorage.getItem("articles"));
  }

  articles.push(article);

  localStorage.setItem("articles", JSON.stringify(articles));
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
