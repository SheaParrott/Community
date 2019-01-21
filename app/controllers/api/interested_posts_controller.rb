class Api::InterestedPostsController < ApplicationController

  def create
    # need a guard clause to not add a post if it is already there
    if current_profile.interested_posts.where(interested_posts_params).present?
      render json: {
        is_added: "You have already added this Post to interested posts"
      }
    else
      interested_post = current_profile.interested_posts.create(interested_posts_params)

      render json: {
        is_added: "Added to Interested Posts"
      }
    end


  end

  def destroy
    current_profile.interested_posts.find_by(post_id: params[:id]).destroy
    
    render json: {
      is_removed: "you removed this post from your Interested Posts"
    }
  end

  private

  def interested_posts_params
    params.require(:interested_post).permit(:post_id)
  end
end
