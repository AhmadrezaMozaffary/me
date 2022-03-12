"use strict";

const { data } = require("autoprefixer");

// Elements
const root = document.documentElement;
const togglerBtn = document.querySelector(".mode-toggler");
const myAvetar = document.querySelector("#profile-pic");
const githubImgs = document.querySelectorAll(".img");
const reposContainer = document.querySelector("#repos-container");
const reposContainerTitle = document.querySelector(".repos-title");
const arrowUp = document.querySelector("#arrow-up");
const loadingSVG = document.querySelector(".loading-svg");

// Initial variables
const myGithubUsername = "AhmadrezaMozaffary";
const avetarAPI = `https://api.github.com/users/${myGithubUsername}`;
const allReposAPI = `https://api.github.com/users/${myGithubUsername}/repos`;

// Recive and display my github profile pic from API
const setMyAvetar = async function () {
  try {
    const responseAPI = await fetch(avetarAPI);
    if (!responseAPI.ok)
      throw new Error(`Avetar is NOT loaded (${response.status})`);

    const { avatar_url: avetarUrl } = await responseAPI.json();
    avetarUrl && myAvetar.setAttribute("src", `${avetarUrl}`);
  } catch (error) {
    console.error(error.message);
  }
};
setMyAvetar();

// Recive and display data from API
const reciveData = async function () {
  try {
    const responseAPI = await fetch(allReposAPI);
    if (!responseAPI.ok)
      throw new Error(`Check your connection ${response.status}`);

    const dataArr = await responseAPI.json();
    reposContainerTitle.textContent = `Top github Repos (${dataArr.length})`;
    dataArr.forEach((data, i) => {
      const repoName = data.name.split("-").join(" "); // Remove dashes
      let repoDesc = data.description;

      // Only display repositories with special '🏅' charachter
      if (!repoDesc?.includes("🏅")) return;
      else repoDesc = repoDesc.replace("🏅", "");

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

    loadingSVG.classList.add("hidden");
    loadingSVG.style.display = "";
  } catch (error) {
    alertify.error(error.message);
  }
};
reciveData();

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
