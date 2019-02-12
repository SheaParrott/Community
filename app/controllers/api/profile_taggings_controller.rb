class Api::ProfileTaggingsController < ApplicationController
  def index
    # all options [:show, :create, :index, :destroy]
    def get_posts (posts)
      posts.map do |post|
        post_details(post)
      end
    end 

    recommended_posts = get_posts(current_profile.recommended_posts.uniq)
    recommended_posts = recommended_posts.select{ |post| post[:current_profile_author] == false}

    render json: {
        posts: recommended_posts.to_set,
    }
  end

  private 
  def post_details(post)
    {
      id: post.id,
      current_profile_author: post.author.id == current_profile.id,
      title: post.title,
      image: post.post_image.attached? && url_for(post.post_image),
      body: post.body,
      comment_count: post.comments.count,
      timestamp: post.created_at,
      interested: current_profile.interested?(post),
      author_id: post.author.id,
      name: post.author.name,
      profile_image: post.author.profile_image.attached? && url_for(post.author.profile_image),
      is_admin_tag: post.tags.where(name: "admin").any?, 
      tags: post.tags, 
    }
  end
end
