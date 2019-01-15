class Api::CommentsController < ApplicationController
  # /api/comment/create
  def create
    current_profile.comments.create(comment_params)

    # Just say all is ok...
    render head: :ok
  end 


  private

  def comment_params
    params.require(:comment).permit(:post_id, :body)
  end

end
