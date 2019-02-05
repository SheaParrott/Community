class Api::CommentsController < ApplicationController
  def create
    new_comment = current_profile.comments.create(comment_params)

    if new_comment.valid?
      render head: :ok
    else
      render json: {
        errors: new_comment.errors.full_messages
      }
    end
  end 
  def delete 
    Comment.find(params[:id]).destroy
  end

  def index
    count = params.fetch(:count) { 15 }

    comments = current_profile.post_comments.order("created_at DESC").limit(count)

    render json: {
      comments: comments.map do |comment|
        {
          id: comment.id,
          body: comment.body,
          post_id: comment.post_id,
          post_title: comment.post.title,
          profile_id: comment.profile.id, 
          is_author: comment.profile.id == current_profile.id,
          profile_name: comment.profile.name, 
          profile_image: comment.profile.profile_image.attached? && url_for(comment.profile.profile_image),
        }
      end
    }
  end
  # "/api/comments/update"
  def update 
    comment = Comment.find(update_comment_params[:id])
    comment.update(update_comment_params)
  end

  private
  def update_comment_params
    params.require(:comment).permit(:id, :body)
  end

  def comment_params
    params.require(:comment).permit(:post_id, :body)
  end

end
