document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");
  const index = params.get("index");

  const titleEl = document.getElementById("detail-title");
  const dateEl = document.getElementById("detail-date");
  const contentEl = document.getElementById("detail-content");
  const backBtn = document.getElementById("back-button");
  const deleteBtn = document.getElementById("delete-button");

  const posts = JSON.parse(localStorage.getItem("posts") || "{}");
  const post = posts[category]?.[index];

  if (post) {
    titleEl.textContent = post.title;
    dateEl.textContent = post.date;
    contentEl.textContent = post.content;
  } else {
    titleEl.textContent = "글을 찾을 수 없습니다.";
    dateEl.textContent = "";
    contentEl.textContent = "";
    deleteBtn.style.display = "none";
  }

  backBtn.addEventListener("click", () => {
    window.history.back();
  });

  deleteBtn.addEventListener("click", () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      posts[category].splice(index, 1);
      localStorage.setItem("posts", JSON.stringify(posts));
      window.location.href = "index.html";
    }
  });
});
