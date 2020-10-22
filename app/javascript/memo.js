function memo() {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    const formData = new FormData(document.getElementById("form"));
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const item = XHR.response.post;   //itemはレスポンスとして返却されたメモのレコードを取得。
      const list = document.getElementById("list"); //listはHTMLを描画する場所を指定する際に使用する「描画する親要素」のlist要素を取得している。
      const formText = document.getElementById("content");  //formTextはメモの入力フォームをリセットするために取得。この処理が終了した時に入力フォームの文字が入力されたままになってしまうから。ここではリセットと対象のcontentを取得している。
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時:${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      list.insertAdjacentHTML("afterend", HTML);
      formText.value = "";  //空の文字列を上書きしてメモの入力フォームの値をリセットしている。
    };
    e.preventDefault();
  });
}
window.addEventListener("load", memo);