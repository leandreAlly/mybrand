let menuicn = document.querySelector(".menuicn");
let nav = document.querySelector(".navcontainer");

menuicn.addEventListener("click", () => {
  nav.classList.toggle("navclose");
});

// sideBar button
const dashboardBtn = document.querySelector(".option1");
const articleBtn = document.querySelector(".option2");
const messageBtn = document.querySelector(".option3");
const commentBtn = document.querySelector(".option4");
const addArticle = document.querySelector(".add-article");

// All table selctors from documents
const boxContainer = document.querySelector(".box-container");
const recentContainer = document.querySelector(".report-container");
const articleContainer = document.querySelector(".article-container");
const addArticleForm = document.querySelector(".add-article-form");
const commentContainer = document.querySelector(".comment-container");
const queryContainer = document.querySelector(".query-container");

// Add event listner to display table
dashboardBtn.addEventListener("click", () => {
  boxContainer.style.display = "flex";
  recentContainer.style.display = "block";
  articleContainer.style.display = "none";
  commentContainer.style.display = "none";
  queryContainer.style.display = "none";
  addArticleForm.style.display = "none";
  // Control active button
  dashboardBtn.classList.add("active");
  articleBtn.classList.remove("active");
  commentBtn.classList.remove("active");
  messageBtn.classList.remove("active");
});
articleBtn.addEventListener("click", () => {
  boxContainer.style.display = "none";
  recentContainer.style.display = "none";
  articleContainer.style.display = "block";
  commentContainer.style.display = "none";
  queryContainer.style.display = "none";
  addArticleForm.style.display = "none";
  // Control active button
  articleBtn.classList.add("active");
  dashboardBtn.classList.remove("active");
  commentBtn.classList.remove("active");
  messageBtn.classList.remove("active");
});
commentBtn.addEventListener("click", () => {
  boxContainer.style.display = "none";
  recentContainer.style.display = "none";
  articleContainer.style.display = "none";
  commentContainer.style.display = "block";
  queryContainer.style.display = "none";
  addArticleForm.style.display = "none";
  // Control active button
  commentBtn.classList.add("active");
  articleBtn.classList.remove("active");
  dashboardBtn.classList.remove("active");
  messageBtn.classList.remove("active");
});
messageBtn.addEventListener("click", () => {
  boxContainer.style.display = "none";
  recentContainer.style.display = "none";
  articleContainer.style.display = "none";
  commentContainer.style.display = "none";
  queryContainer.style.display = "block";
  addArticleForm.style.display = "none";
  // Control active button
  messageBtn.classList.add("active");
  commentBtn.classList.remove("active");
  articleBtn.classList.remove("active");
  dashboardBtn.classList.remove("active");
});
// Display Add article form
addArticle.addEventListener("click", () => {
  addArticleForm.style.display = "block";
  articleContainer.style.display = "none";
});

// Check if the user is logged off
document.addEventListener("DOMContentLoaded", () => {
  // Get the Message from LocalStorage
  getMessageFromStorage();

  // Get article from LocalStorage
  getArticleFromStorage();
  let authStatus = localStorage.getItem("auth_status");
  if (authStatus === "off") {
    window.location.href = "/ui/login/index.html";
  } else {
    return false;
  }
});
// Logout event
document.querySelector(".logout").addEventListener("click", () => {
  if (confirm("Are you sure You want to logout?")) {
    logout();
  } else {
    return false;
  }
});

// Delete message from localStorage
function deleteMessage(event) {
  if (confirm("Do You want to delete this message")) {
    const button = event.target;
    const tr = button.closest("tr");
    const dataId = tr.getAttribute("data-id");
    // console.log(dataId);
    let messages;
    if (localStorage.getItem("messages") === null) {
      messages = [];
    } else {
      messages = JSON.parse(localStorage.getItem("messages"));
    }
    messages = messages.filter((message) => message.id !== parseInt(dataId));
    tr.remove();
    localStorage.setItem("messages", JSON.stringify(messages));
  } else {
    return false;
  }
}

// Delete article from localStorage
function deleteArticle(event) {
  if (confirm("Do You want to delete this Article")) {
    const button = event.target;
    const tr = button.closest("tr");
    const dataId = tr.getAttribute("data-id");
    // console.log(dataId);
    let articles;
    if (localStorage.getItem("articles") === null) {
      articles = [];
    } else {
      articles = JSON.parse(localStorage.getItem("articles"));
    }
    articles = articles.filter((article) => article.id !== parseInt(dataId));
    tr.remove();
    localStorage.setItem("articles", JSON.stringify(articles));
  } else {
    return false;
  }
}

// Get Message query from local
function getMessageFromStorage() {
  let messages;
  let html = "";
  if (localStorage.getItem("messages") === null) {
    messages = [];
  } else {
    messages = JSON.parse(localStorage.getItem("messages"));
  }
  messages.forEach(function (message) {
    html += `
        <tr data-id="${message.id}">
          <td>${message.message}</td>
          <td>${message.name}</td>
          <td>${message.email}</td>
          <td>
              <button class="t-op-nextlvl approve-tag">Contact</button>
              <button  onclick ="deleteMessage(event);" class="t-op-nextlvl delete-tag">Delete</button>
          </td>
      </tr>
    `;
  });
  // Get parent element
  const table = document.querySelector("#query-message");
  table.innerHTML += html;
}

// Get article from local storage
function getArticleFromStorage() {
  let articles;
  let html = "";
  if (localStorage.getItem("articles") === null) {
    articles = [];
  } else {
    articles = JSON.parse(localStorage.getItem("articles"));
  }
  articles.forEach(function (article) {
    html += `
            <tr data-id = "${article.id}">
                <td>${article.title}</td>
                <td>${article.date}</td>
                <td>2.9k</td>
                <td>210</td>
                <td><button class="t-op-nextlvl edit-tag">Edit</button></td>
                <td><button onclick="deleteArticle(event)" class="t-op-nextlvl delete-tag">Delete</button></td>
          </tr>
</table>
    `;
  });
  // Get parent element
  const table = document.querySelector("#article-list");
  table.innerHTML += html;
}
// Logout function
function logout() {
  localStorage.setItem("auth_status", "off");
  window.location.href = "/ui/login/index.html";
}
