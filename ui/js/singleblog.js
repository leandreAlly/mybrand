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

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
displayFullBlog(id);

let userName;
let commentTexts;
// Display full blog after getting it in local storage
async function displayFullBlog(id) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(
    `https://portifolio-website.up.railway.app/api/v1/blogs/${id}`,
    options
  );

  const data = await response.json();

  let article = data.Post;
  const commentsLength = data.Post.comments.length;

  const commentResponse = await fetch(
    `https://portifolio-website.up.railway.app/api/v1/blogs/${id}/comments`,
    options
  );

  const commentData = await commentResponse.json();

  let articleComments = commentData.comment;
  const numComments = articleComments.length;
  function addEventListeners() {
    const likeButton = document.querySelector(".like-button");
    likeButton.addEventListener("click", function () {
      likeBlog();
    });
  }
  let html = `
  <article class="article-featured">
  <h2 class="article-title">${article.blogTitle}</h2>
  <img src="${article.blogImage}" alt="" class="article-image" />
  <p class="article-info">date|${commentsLength} comments</p>

  <div class="article-body">${article.blogContent}</div>
  <div class="article-button">
            <div class="like-button">
              <i class="bx bxs-like"></i>${article.likes}<span> Like</span>
            </div>
  <div class="comment-button">
              <i class="bx bxs-comment"></i>${numComments}<span> Comment</span>
            </div>
      </div>


    <!--Comment section -->
    <section class="comments-display">
    <h3>Comments</h3>
    <ul>
      ${
        articleComments.length > 0
          ? articleComments
              .map(
                (comment) => `
            <li class="comment">
              <div class="user-info">
                <span class="user-name">${comment.name}</span>
                <span class="date">${comment.date}</span>
              </div>
              <p class="comment-text">
                ${comment.content}
              </p>
            </li>
          `
              )
              .join("")
          : '<li class="comment">No Comments Yet</li>'
      }
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
  addEventListeners();
  const submitComment = async (event) => {
    event.preventDefault();
    userName = document.querySelector("#user-name");
    commentTexts = document.querySelector("#comment-field");

    const isCommentValid = validateComment();
    if (isCommentValid) {
      const data = {
        name: userName.value,
        content: commentTexts.value,
        // date: getCurrentDate(),
      };

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      try {
        const response = await fetch(
          `https://portifolio-website.up.railway.app/api/v1/blogs/${id}/comments`,
          options
        );
        if (!response.ok) {
          throw new Error("Posting comment failed");
        }
        console.log("comment successfully added");
        location.reload();
      } catch (error) {
        console.log("error happen", error);
      }
      clearFields();
    } else {
      return false;
    }
  };
  const subBtn = document.getElementById("myBtn");
  subBtn.addEventListener("click", submitComment);
}

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

async function likeBlog() {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    `https://portifolio-website.up.railway.app/api/v1/blogs/${id}/likes`,
    options
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  location.reload();
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
