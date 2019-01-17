class Api::CommentsController < ApplicationController
  # /api/comment/create
  def create
    current_profile.comments.create(comment_params)

    # Just say all is ok...
    render head: :ok
  end 

  def index
    # How many do want? the amount requested or 10 
    count = params.fetch(:count) { 15 }

    # Get that many from the post_comments
    comments = current_profile.post_comments.order("created_at DESC").limit(count)

    render json: {
      comments: comments.map do |comment|
        {
          id: comment.id,
          body: comment.body,
          post_id: comment.post_id,
          profile_id: comment.profile.id, 
          is_author: comment.profile.id == current_profile.id,
          profile_name: comment.profile.name, 
          profile_image: comment.profile.profile_image.attached? && url_for(comment.profile.profile_image),
        }
      end
    }
  end

  private

  def comment_params
    params.require(:comment).permit(:post_id, :body)
  end

end
