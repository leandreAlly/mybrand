let editor = new FroalaEditor("#subject", {
  heightMax: 200,
});
const blogTitle = document.querySelector("#blog-title");
const blogContent = document.querySelector("#subject");
const blogImage = document.querySelector("#blog-image");
const publishBtn = document.querySelector("#publish-btn");

publishBtn.addEventListener("click", (e) => {
  const isblogValid = validatArticle();

  if (isblogValid) {
    console.log(blogTitle.value);
    console.log(blogContent.value);
    clearFields();
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

const validatArticle = () => {
  let status;
  const blogT = blogTitle.value.trim();
  const blogCont = blogContent.value.trim();

  if (blogT === "") {
    setError(blogTitle, "Title is required");
  } else if (blogT.length < 10) {
    setError(blogTitle, "Your title must be greater than 10 letters");
  } else {
    setSuccess(blogTitle);
  }

  if (blogCont === "") {
    setError(blogContent, "content is required");
  } else if (blogCont.length < 10) {
    setError(blogContent, "Your content must greater than 10 letters");
  } else {
    setSuccess(blogContent);
  }

  if (blogT && blogCont) {
    status = true;
  } else {
    status = false;
  }

  return status;
};

function clearFields() {
  blogTitle.value = "";
  editor.html.set("");
}

// function validateFileType() {
//   let inputElement = document.getElementById("file-upload");
//   let files = inputElement.files;
//   if (files.length == 0) {
//     alert("Please choose a file first...");
//     return false;
//   } else {
//     let filename = files[0].name;

//     /* getting file extenstion eg- .jpg,.png, etc */
//     let extension = filename.substr(filename.lastIndexOf("."));

//     /* define allowed file types */
//     let allowedExtensionsRegx = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

//     /* testing extension with regular expression */
//     let isAllowed = allowedExtensionsRegx.test(extension);

//     if (isAllowed) {
//       alert("File type is valid for the upload");
//       /* file upload logic goes here... */
//     } else {
//       alert("Invalid File Type.");
//       return false;
//     }
//   }
// }
