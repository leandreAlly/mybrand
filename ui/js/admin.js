 let menuicn = document.querySelector(".menuicn");
 let nav = document.querySelector(".navcontainer");

    menuicn.addEventListener("click", () => {
      nav.classList.toggle("navclose");
    })

// sideBar button
const dashboardBtn = document.querySelector(".option1");
const articleBtn = document.querySelector(".option2");
const messageBtn = document.querySelector(".option3");
const commentBtn = document.querySelector(".option4");
const addArticle = document.querySelector(".add-article")



// All table selctors from documents
const boxContainer = document.querySelector(".box-container")
const recentContainer = document.querySelector(".report-container")
const articleContainer = document.querySelector(".article-container")
const addArticleForm = document.querySelector(".add-article-form")
const commentContainer = document.querySelector(".comment-container")
const queryContainer = document.querySelector(".query-container")


// Add event listner to display table
dashboardBtn.addEventListener("click", () => {
  boxContainer.style.display = "flex"
  recentContainer.style.display = "block"
  articleContainer.style.display = "none"
  commentContainer.style.display = "none"
  queryContainer.style.display = "none"
  addArticleForm.style.display = "none"
})
articleBtn.addEventListener("click", () => {
  boxContainer.style.display = "none"
  recentContainer.style.display = "none"
  articleContainer.style.display = "block"
  commentContainer.style.display = "none"
  queryContainer.style.display = "none"
  addArticleForm.style.display = "none"
})
commentBtn.addEventListener("click", () => {
  boxContainer.style.display = "none"
  recentContainer.style.display = "none"
  articleContainer.style.display = "none"
  commentContainer.style.display = "block"
  queryContainer.style.display = "none"
  addArticleForm.style.display = "none"
})
messageBtn.addEventListener("click", () => {
  boxContainer.style.display = "none"
  recentContainer.style.display = "none"
  articleContainer.style.display = "none"
  commentContainer.style.display = "none"
  queryContainer.style.display = "block"
  addArticleForm.style.display = "none"
})
// Display Add article form
addArticle.addEventListener("click", () => {
  addArticleForm.style.display = "block"
   articleContainer.style.display = "none"
})