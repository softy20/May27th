document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll("nav button");
  const postList = document.getElementById("post-list");
  const writeBtn = document.getElementById("write-button");

  // + 버튼 → 글쓰기 페이지로 이동
  writeBtn.addEventListener("click", () => {
    const currentCategory = document.querySelector("nav button.active")?.dataset.category;
    // URL에 category 파라미터 추가
    window.location.href = `write.html?category=${encodeURIComponent(currentCategory)}`;
  });

  // 카테고리 버튼 클릭 → 해당 글목록 표시 + active
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      navButtons.forEach(b => b.classList.remove("active")); // 이전 active 제거
      btn.classList.add("active"); // 클릭한 버튼에 active

      const category = btn.getAttribute("data-category");
      renderPosts(category); //함수 출력
    });
  });

  // 글 렌더링 함수
  function renderPosts(category) {
    const posts = JSON.parse(localStorage.getItem("posts") || "{}");
    const selectedPosts = posts[category] || [];

    postList.innerHTML = ""; //기존에 있던 내용 지움

    if (selectedPosts.length === 0) {
      postList.innerHTML = "<p style='text-align:center;'>글이 없습니다.</p>";
      return;
    }

    selectedPosts.slice(0, 3).forEach((post, i) => {
      const postDiv = document.createElement("div");
      postDiv.classList.add("post-item");
      postDiv.innerHTML = `
        <h3>${post.title}</h3>
        <p><strong>${post.date}</strong></p>
        <p>${post.content.split('\n')[0]}</p> 
      `; //글 내용 첫 번째 줄만 보여줌
      postList.appendChild(postDiv);

      postDiv.addEventListener("click", () => {
        window.location.href = `detail.html?category=${category}&index=${i}`;
      });
    });
  }

  // 초기: 첫 번째 버튼 클릭한 상태로
  const firstBtn = navButtons[0];
  if (firstBtn) {
    firstBtn.classList.add("active");
    renderPosts(firstBtn.getAttribute("data-category"));
  }

  const params = new URLSearchParams(window.location.search);
  const initialCategory = params.get("category");

  if (initialCategory) {
    renderPosts(initialCategory);

    // nav 버튼 active 처리
    document.querySelectorAll("nav button").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.category === initialCategory);
    });
  } else {
    renderPosts(category); // 기본값
  }


});
