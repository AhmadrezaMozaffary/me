"use strict";

// Elements
const root = document.documentElement;
const togglerBtn = document.querySelector(".mode-toggler");
const githubImgs = document.querySelectorAll(".img");
const reposContainer = document.querySelector("#repos-container");
const arrowUp = document.querySelector("#arrow-up");

// Iitial variables
const myGithubUsername = "AhmadrezaMozaffary";
const allReposAPI = `https://api.github.com/users/${myGithubUsername}/repos`;
console.log(root.classList.contains("dark"));
// Recive data from API
fetch(allReposAPI)
  .then((response) => {
    if (!response.ok)
      throw new Error(`Check your connection ${response.status}`);
    return response.json();
  })
  .then((dataArr) => {
    dataArr.forEach((data, i) => {
      const repoName = data.name.split("-").join(" "); // Remove dashes
      const repoDesc = data.description;
      const repoComponent = `
      <!-- Repository (${i + 1}) -->
      <div
          class="w-11/12 h-12/12 flex justify-center items-center mx-auto my-5 overflow-visible border border-gray-500 p-5 rounded-tl-2xl"
      >
          <!-- Right -->
          <div class="w-1/5 ml-2 order-2 overflow-hidden">
          <h6 class="badge">${data.private ? "pv" : "pub"}</h6>
          <img src="./images/GitHub-Dark.png" alt="github-icon" />
          </div>
  
          <!-- Left -->
          <div
          class="w-4/5 h-full flex flex-col justify-center overflow-hidden order-1 mr-1"
          >
          <h3 class="text-xl uppercase">${repoName}</h3>
          <h4 class="${repoDesc ? "" : "hidden"}text-sm mb-3">${
        repoDesc ? repoDesc : ""
      }</h4>
          <h5 >${
            data.topics?.length > 0 ? data.topics.slice(0, 4) + " ..." : " - "
          }<h5>
  
          <!-- btn container -->
          <div class="w-full h-2/6 mt-4 flex justify-center items-center">
              <a class="btn" href="${data.html_url}" target="_blank">repo</a>
              <a class="btn" href="${
                data.homepage ? data.homepage : "#"
              }">visit</a>
          </div>
          </div>
      </div>
  `;

      reposContainer.insertAdjacentHTML("beforeend", repoComponent);
    });
  })
  .catch((err) => alertify.error(err));

// Toggling modes
togglerBtn.addEventListener("click", () => {
  const sun = document.querySelector(".fa-sun");
  const moon = document.querySelector(".fa-moon");

  if (root.classList.contains("dark")) {
    sun.classList.add("hidden");
    moon.classList.remove("hidden");

    githubImgs.forEach((img) =>
      img.setAttribute("src", "./images/GitHub-Light.png")
    );

    root.classList.remove("dark");
  } else {
    sun.classList.remove("hidden");
    moon.classList.add("hidden");

    githubImgs.forEach((img) =>
      img.setAttribute("src", "./images/GitHub-Dark.png")
    );

    root.classList.add("dark");
  }
});

// Download Resume
window.addEventListener("load", () => {
  document.querySelector(".resume").addEventListener("click", () => {
    const printElContainer = document.querySelector("#print");

    const opt = {
      margin: 0,
      filename: "resume.pdf",
      jsPDF: { format: "letter", orientation: "portrait" },
    };

    // New Promise-based usage:
    html2pdf().set(opt).from(printElContainer).save();
  });
});

// Arrow Up btn
arrowUp.addEventListener("click", () => {
  window.scrollTo(0, 0);
});
