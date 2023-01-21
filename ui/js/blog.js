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

// Side NavIgation Menu JS Code
let body = document.querySelector("body");
let navBar = document.querySelector(".navbar");
let menuBtn = document.querySelector(".menu-btn");
let cancelBtn = document.querySelector(".cancel-btn");
menuBtn.onclick = function () {
  navBar.classList.add("active");
  menuBtn.style.opacity = "0";
  menuBtn.style.pointerEvents = "none";
  body.style.overflow = "hidden";
  //   scrollBtn.style.pointerEvents = "none";
};
cancelBtn.onclick = function () {
  navBar.classList.remove("active");
  menuBtn.style.opacity = "1";
  menuBtn.style.pointerEvents = "auto";
  body.style.overflow = "auto";
  //   scrollBtn.style.pointerEvents = "auto";
};

// Side Navigation Bar Close While We Click On Navigation Links
let navLinks = document.querySelectorAll(".menu li a");
for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function () {
    navBar.classList.remove("active");
    menuBtn.style.opacity = "1";
    menuBtn.style.pointerEvents = "auto";
  });
}

// document.addEventListener("DOMContentLoaded", getMessageFromStorage);

getMessageFromStorage();

function getMessageFromStorage() {
  let articles;
  let html = "";
  if (localStorage.getItem("articles") === null) {
    articles = [];
  } else {
    articles = JSON.parse(localStorage.getItem("articles"));
    // console.log(articles);
  }
  articles.forEach(function (article) {
    let shortContent = article.blogContent.substring(0, 300) + ".....</p>";

    // Get all comments belongs to single article and display it's length
    let comments;
    if (localStorage.getItem("comments") === null) {
      comments = [];
    } else {
      comments = JSON.parse(localStorage.getItem("comments"));
    }
    const matchingComments = comments.filter(
      (comment) => comment.articleId === article.id
    );
    const numComments = matchingComments.length; //comments length belongs to single article

    html += `
    <article class="article-recent">
    <div class="article-recent-main">
      <h2 class="article-title">${article.title}</h2>
      <p class="article-body">${shortContent}</p>
      <div class="btn-container">
        <button onclick="showMore(event);" data-id="${article.id}" id="toggle">Read more</button>
      </div>
      <div class="article-button">
        <div class="like-button">
          <i class="bx bxs-like"></i>1<span> Like</span>
        </div>
        <div class="comment-button">
          <i class="bx bxs-comment"></i>${numComments}<span> Comment</span>
        </div>
      </div>
    </div>

    <div class="article-recent-secondary">
      <img src="${article.image}" alt="" class="article-image" />
      <p class="article-info">${article.date}| ${numComments} comments</p>
    </div>
  </article>
    `;
  });
  // Get parent element
  const mainDiv = document.querySelector("#main");
  mainDiv.innerHTML += html;
}

// function showMore(event) {
//   // Get the data-id attribute value
//   let articleId = event.target.getAttribute("data-id");

//   // Redirect the user to another page and pass the article id as a query string
//   window.location.href = `/ui/blog/single-blog-view.html?id=${articleId}`;
// }
