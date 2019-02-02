class Api::PostsController < ApplicationController
  
  def create 
    new_post = current_profile.authored_posts.create(post_params)

    if new_post.valid?
      render head: :ok
    else
      render json: {
        errors: new_post.errors.full_messages
      }
    end

  end 



  def show
    post_id = params[:id]

    post = Post.find(post_id)

    comments = post.comments.map do |comment|
      {
        id: comment.id,
        current_profile_author: if comment.profile.id == current_profile.id then true else false end,
        body: comment.body,
        author_id: comment.profile.id,
        author_image: comment.profile.profile_image.attached? && url_for(comment.profile.profile_image),
        author_name: comment.profile.name
      }
    end

    render json: {
      post: {
        id: post.id,
        current_profile_author: post.author.id == current_profile.id,
        title: post.title, 
        image: post.post_image.attached? && url_for(post.post_image),
        body: post.body, 
        timestamp: post.created_at,
        author_id: post.author.id, 
        name: post.author.name, 
        profile_image: post.author.profile_image.attached? && url_for(post.author.profile_image),
        comment_count: comments.size,
        comments: comments,
        interested: current_profile.interested?(post)
      }
    }
  end

  # "/api/posts/update"
  def update 
    post = Post.find(update_post_params[:id])
    pos.update(update_post_params)
  end

  def destroy 

    Post.find(params[:id]).destroy
  end


  private

  def update_post_params
    params.require(:post).permit(:id, :title, :post_image, :body, tag_ids: [])
  end
  
  def post_params
    params.require(:post).permit(:title, :post_image, :body, tag_ids: [])
  end
end