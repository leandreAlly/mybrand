// Validate Comment Section
let articles = JSON.parse(localStorage.getItem("articles"));
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log(id);

let articleToDisplay = articles.filter(function (art) {
  return art.id == parseInt(id);
});

console.log(articleToDisplay);
displayFullBlog(articleToDisplay);
function displayFullBlog(article) {
  let html = `
  <article class="article-featured">
  <h2 class="article-title">${article[0].title}</h2>
  <img src="images/asset7.jpg" alt="" class="article-image" />
  <p class="article-info">${article[0].date}| 3 comments</p>

  <div class="article-body">${article[0].blogContent}</div>

  <div class="comment-section">
    <form id="form" action="#">
      <div class="input-name">
        <label for="user-name">Your Name</label>
        <input type="text" id="user-name" placeholder="Your name.." />
        <div class="error"></div>
      </div>
      <div class="input-message">
        <label for="subject">Comment</label>
        <textarea
          id="comment-field"
          placeholder="Write Your Comment.."
          style="height: 200px"
        ></textarea>
        <div class="error"></div>
      </div>
      <input type="submit" id="myBtn" value="Submit" />
    </form>
  </div>
  <div class="btn-container">
    <button id="toggle">Read more</button>
  </div>
  <div class="article-button">
    <div class="like-button">
      <i class="bx bxs-like"></i>1<span> Like</span>
    </div>
    <div class="comment-button">
      <i class="bx bxs-comment"></i>2<span> Comment</span>
    </div>
  </div>
</article>
  `;

  const mainDiv = document.querySelector(".main");
  mainDiv.innerHTML += html;
}

const userName = document.querySelector("#user-name");
const commentTexts = document.querySelector("#comment-field");
const subBtn = document.querySelector("#myBtn");

subBtn.addEventListener("click", (e) => {
  const isCommentValid = validateComment();

  if (isCommentValid) {
    console.log(userName.value);
    console.log(commentTexts.value);
    clearFields();
  }

  e.preventDefault();
});

const setError = (element, message) => {
  const commentSection = element.parentElement;
  const errorDisplay = commentSection.querySelector(".error");

  errorDisplay.innerText = message;
  commentSection.classList.add("error");
  commentSection.classList.remove("success");
};
const setSuccess = (element) => {
  const commentSection = element.parentElement;
  const errorDisplay = commentSection.querySelector(".error");

  errorDisplay.innerText = "";
  commentSection.classList.add("success");
  commentSection.classList.remove("error");
};

const validateComment = () => {
  let status;
  const useName = userName.value.trim();
  const cmntText = commentTexts.value.trim();

  if (useName === "") {
    setError(userName, "Your name is required");
  } else if (useName.length < 5 || useName.length > 25) {
    setError(userName, "Your name must be between 5 and 25 letters");
  } else {
    setSuccess(userName);
  }

  if (cmntText === "") {
    setError(commentTexts, "Message is required");
  } else if (cmntText.length < 10 || cmntText.length > 30) {
    setError(commentTexts, "Your message must be between 10 and 50 letters");
  } else {
    setSuccess(commentTexts);
  }

  if (useName && cmntText) {
    status = true;
  } else {
    status = false;
  }

  return status;
};

function clearFields() {
  userName.value = "";
  commentTexts.value = "";
}
