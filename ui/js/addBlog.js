const inputText = document.querySelector("#subject");
const publishBtn = document.querySelector("#publish-btn");

publishBtn.addEventListener("click", (e) => {
  console.log(inputText.value);
  e.preventDefault();
});
