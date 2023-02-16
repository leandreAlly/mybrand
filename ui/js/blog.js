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

getBlogs();

async function getBlogs() {
  let articles;
  let html = "";
  let sideWidets = "";

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(
      "https://portifolio-website.up.railway.app/api/v1/blogs",
      options
    );
    if (!response.ok) {
      throw new Error("Getting blog failed");
    }
    const data = await response.json();

    articles = data.blogs;

    articles.forEach(function (article) {
      let shortContent = article.blogContent.substring(0, 300) + ".....</p>";
      html += `
      <article class="article-recent">
      <div class="article-recent-main">
        <h2 class="article-title">${article.blogTitle}</h2>
        <p class="article-body">${shortContent}</p>
        <div class="btn-container">
          <button onclick="showMore(event);" data-id="${article._id}" id="toggle">Read more</button>
        </div>
        <div class="article-button">
          <div class="like-button">
            <i class="bx bxs-like"></i>${article.likes}<span> Like</span>
          </div>
          <div class="comment-button">
            <i class="bx bxs-comment"></i>0<span> Comment</span>
          </div>
        </div>
      </div>
  
      <div class="article-recent-secondary">
        <img src="${article.blogImage}" alt="" class="article-image" />
        <p class="article-info">25| 0 comments</p>
      </div>
    </article>
      `;

      sideWidets += `
      <div class="widget-recent-post">
              <h3 class="widget-recent-post-title">${article.blogTitle}</h3>
              <img onclick="showMore(event);" data-id="${article._id}" src="${article.blogImage}" alt="" class="widget-image" />
            </div>
      `;
    });
    // Get parent element
    const mainDiv = document.querySelector("#main");
    mainDiv.innerHTML += html;

    const sideMain = document.querySelector("#sidebar-article");
    sideMain.innerHTML += sideWidets;
  } catch (error) {
    console.log("error", error);
  }
}
