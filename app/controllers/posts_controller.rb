class PostsController < ApplicationController
  def index
    @posts = Post.all.order(id: "DESC")
  end

  def create
    post = Post.create(content: params[:content], checked: false)
    render json:{ post: post }
  end

  def checked
    post = Post.find(params[:id]) #先ほど設定したURLパラメーターから、既読したメモのidが渡されるように設定するので、そのidを使用して該当するレコードを取得しています。
    if post.checked 
      post.update(checked: false) #if文で、post.checkedという既読であるか否かを判定するプロパティを指定し、
    else                          #既読であれば「既読を解除するためにfalseへ変更」し、既読でなければ「既読にするためtrueへ変更」します。
      post.update(checked: true)  #この時はupdateというActiveRecordのメソッドを使用して更新しています。
    end

    item = Post.find(params[:id]) #最後に、更新したレコードをitem = Post.find(params[:id])で取得し直し、
    render json: { post: item }   #render json:{ post: item }でJSON形式（データ）としてchecked.jsに返却しています。
  end
end