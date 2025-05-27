document.addEventListener("DOMContentLoaded", () => {
  //전달받은 category를 select에 반영
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");

  if (category) {
    const selectEl = document.getElementById("category-select");
    selectEl.value = category;
  }

  // 오늘 날짜 구하기
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${yyyy}. ${mm}. ${dd}.`;

  // 날짜 input에 값 넣기
  const dateInput = document.getElementById("date-input");
  dateInput.value = formattedDate;
  
  // 뒤로가기
  document.getElementById("back-button").addEventListener("click", () => {
    const category = new URLSearchParams(window.location.search).get("category");
    if (category) {
      window.location.href = `index.html?category=${encodeURIComponent(category)}`;
    } else {
      window.location.href = "index.html";
    }
  });

  // 제출 버튼
  document.getElementById("submit-button").addEventListener("click", () => {
    const title = document.getElementById("title-input").value.trim();
    const category = document.getElementById("category-select").value;
    const date = dateInput.value;
    const content = document.getElementById("content-input").value.trim();

    if (!title || !content) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    let posts = JSON.parse(localStorage.getItem("posts") || "{}");
    if (!posts[category]) posts[category] = [];
    posts[category].unshift({ title, date, content }); //배열 맨 앞에 추가
    localStorage.setItem("posts", JSON.stringify(posts));

    alert("글이 등록되었습니다.");
    window.location.href = "index.html";
  });
});
