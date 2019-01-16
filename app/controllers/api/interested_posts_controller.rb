class Api::InterestedPostsController < ApplicationController

  def create
    interested_post = current_profile.interested_posts.create(interested_posts_params)

    render json: interested_post
  end

  private

  def interested_posts_params
    params.require(:interested_post).permit(:post_id)
  end
end
