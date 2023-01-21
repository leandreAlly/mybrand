// Sticky Navigation Menu JS Code
let nav = document.querySelector("nav");
let scrollBtn = document.querySelector(".scroll-button a");
// console.log(scrollBtn);
let val;
window.onscroll = function () {
  if (document.documentElement.scrollTop > 20) {
    nav.classList.add("sticky");
    // scrollBtn.style.display = "block";
  } else {
    nav.classList.remove("sticky");
    // scrollBtn.style.display = "none";
  }
};

// Get all articles from local storage
let articles = JSON.parse(localStorage.getItem("articles"));
//Get ID of single blog after click on read More button
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

// Filter all article to match with one has id passed
let articleToDisplay = articles.filter(function (art) {
  return art.id == parseInt(id);
});

displayFullBlog(articleToDisplay);
// Display full blog after getting it in local storage
function displayFullBlog(article) {
  // Get all comments belongs to single article and display it's length
  let comments = JSON.parse(localStorage.getItem("comments"));
  let articleComments = comments.filter(
    (comment) => comment.articleId === article[0].id
  );
  const numComments = articleComments.length;

  let html = `
  <article class="article-featured">
  <h2 class="article-title">${article[0].title}</h2>
  <img src="images/asset10.jpg" alt="" class="article-image" />
  <p class="article-info">${article[0].date}| ${numComments} comments</p>

  <div class="article-body">${article[0].blogContent}</div>
  <div class="article-button">
            <div class="like-button">
              <i class="bx bxs-like"></i>1<span> Like</span>
            </div>
  <div class="comment-button">
              <i class="bx bxs-comment"></i>${numComments}<span> Comment</span>
            </div>
      </div>
      <section class="comments-display">
      <h3>Comments</h3>
      <ul>
        ${articleComments
          .map(
            (comment) => `
          <li class="comment">
            <div class="user-info">
              <span class="user-name">${comment.author}</span>
              <span class="date">${comment.date}</span>
            </div>
            <p class="comment-text">
              ${comment.comment}
            </p>
          </li>
        `
          )
          .join("")}
      </ul>
    </section>
  
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
    <button id="toggle">Read Less</button>
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
  e.preventDefault();
  const isCommentValid = validateComment();
  if (isCommentValid) {
    let newId = Math.floor(Math.random() * (1000000 - 100000) + 100000);
    const data = {
      commentId: newId,
      articleId: parseInt(id),
      author: userName.value,
      comment: commentTexts.value,
      date: getCurrentDate(),
    };
    storeCommentInLocalStorage(data);
    clearFields();
  }
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
  let status = true;
  const useName = userName.value.trim();
  const cmntText = commentTexts.value.trim();

  if (useName === "") {
    setError(userName, "Your name is required");
    status = false;
  } else if (useName.length < 5 || useName.length > 25) {
    setError(userName, "Your name must be between 5 and 25 letters");
    status = false;
  } else {
    setSuccess(userName);
  }

  if (cmntText === "") {
    setError(commentTexts, "Message is required");
    status = false;
  } else if (cmntText.length < 10 || cmntText.length > 100) {
    setError(commentTexts, "Your message must be between 10 and 50 letters");
    status = false;
  } else {
    setSuccess(commentTexts);
  }
  return status;
};
// Store comment in Local Storage
function storeCommentInLocalStorage(comment) {
  let comments;
  if (localStorage.getItem("comments") === null) {
    comments = [];
  } else {
    comments = JSON.parse(localStorage.getItem("comments"));
  }

  comments.push(comment);

  localStorage.setItem("comments", JSON.stringify(comments));
}

function clearFields() {
  userName.value = "";
  commentTexts.value = "";
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
