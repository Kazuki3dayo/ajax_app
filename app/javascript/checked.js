function check() {
  const posts = document.querySelectorAll(".post");
  posts.forEach(function (post) {
    if (post.getAttribute("data-load") != null) {   //1回目はdata-load=trueが追加されていないので読み込まれず、2回目でifが読み込まれ返り値としてreturn nullが返ってくる。
      return null;
    }
    post.setAttribute("data-load", "true"); //要素にdata-load = "true"と属性を追加している
    post.addEventListener("click", () => {
      const postId = post.getAttribute("data-id");  // これでindex.html.erbからメモのidが取得できる。
      const XHR = new XMLHttpRequest(); //エンドポイントを呼び出すためにHTTPリクエストを行う。まずオブジェクトを生成する必要があるのでこの記述を追加。
      XHR.open("GET", `/posts/${postId}`, true);  //エンドポイントリクエスト詳細
      XHR.responseType = "json";
      XHR.send();
      XHR.onload = () => {
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);  //HTTPステータスコードが200以外の場合はifはtrueとなり、アラートを表示する。XHR.statusTextによってエラーが生じたオブジェクトに含まれるエラ〜メッセージが表示される。
          return null;  //return nullによってJavaScriptの処理から抜け出すことができる。これはエラーがでた場合にこの記述以下の処理を実行しない様にしている。
        }
        const item = XHR.response.post; //XHR.responseでレスポンスされてきたJSONにアクセスできる。コントローラーのcheckedアクションで返却したitemはXHR.response.postで取得できる。
        if (item.checked === true) {
          post.setAttribute("data-check", "true");  //既読であればHTMLに定義した属性のdata-checkの属性値にtrueをセットする。
        } else if (item.checked === false) {
          post.removeAttribute("data-check");   //未読であればdata-checkは属性ごと削除する。
        }
      };
     });
  });
}
setInterval(check, 1000);