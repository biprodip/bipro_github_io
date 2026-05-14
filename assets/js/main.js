const toggle = document.querySelector(".nav-toggle");
const menu = document.querySelector(".nav-menu");
const searchDialog = document.querySelector(".search-dialog");
const searchInput = document.querySelector("#site-search");
const searchResults = document.querySelector(".search-results");
const searchClose = document.querySelector(".search-close");
const searchTriggers = document.querySelectorAll(".search-trigger");

const searchIndex = [
  { title: "about", url: "index.html", text: "homepage introduction interests" },
  { title: "projects", url: "projects.html", text: "selected work portfolio apps automation" },
  { title: "blog", url: "blog.html", text: "posts notes writing learning" },
  { title: "personal portfolio website", url: "projects.html#portfolio", text: "github pages html css javascript" },
  { title: "web application project", url: "projects.html#web-app", text: "app ui api project" },
  { title: "automation or data tool", url: "projects.html#automation", text: "python data scripts dashboard" },
  { title: "starting this portfolio", url: "blog.html#first-post", text: "github pages static site" },
  { title: "building in public", url: "blog.html#building-in-public", text: "learning progress public projects" },
];

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

function renderResults(query = "") {
  if (!searchResults) return;
  const value = query.trim().toLowerCase();
  const matches = searchIndex.filter((item) => {
    return !value || `${item.title} ${item.text}`.toLowerCase().includes(value);
  });

  searchResults.innerHTML = matches
    .map((item) => `<li><a href="${item.url}">${item.title}</a></li>`)
    .join("");
}

function openSearch() {
  if (!searchDialog || !searchInput) return;
  searchDialog.hidden = false;
  renderResults(searchInput.value);
  searchInput.focus();
}

function closeSearch() {
  if (!searchDialog) return;
  searchDialog.hidden = true;
}

searchTriggers.forEach((trigger) => trigger.addEventListener("click", openSearch));
searchClose?.addEventListener("click", closeSearch);
searchInput?.addEventListener("input", (event) => renderResults(event.target.value));

document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    openSearch();
  }

  if (event.key === "Escape") {
    closeSearch();
  }
});
