import "./index.scss";

import { initAnalytics } from "../shared/analytics";

const articles = document.getElementById("articles");

articles.querySelectorAll("article").forEach((article) => {
  article.addEventListener("click", (evt) => {
    const slug = article.getAttribute("data-slug");
    document.location.href = "blogposts/" + slug;
  });
});

initAnalytics();
