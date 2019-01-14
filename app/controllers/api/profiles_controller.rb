class Api::ProfilesController < ApplicationController
  # skip_before_action :verify_authenticity_token

  def show
    profile_id = params[:id]

    profile = Profile.find(profile_id)

    posts = profile.authored_posts.map do |post|
      {
        id: post.id,
        title: post.title,
        image: url_for(post.post_image),
        body: post.body,
        timestamp: post.created_at
      }
    end

    interested_posts = profile.posts.map do |post|
      {
        id: post.id,
        title: post.title,
        image: url_for(post.post_image),
        body: post.body,
        timestamp: post.created_at, 
        author: post.author.id, 
        name: post.author.name, 
        profile_image: url_for(post.author.profile_image),

      }
    end

    # recommended_posts = profile. do |post|
    #   {
    #     id: post.id,
    #     title: post.title,
    #     image: url_for(post.post_image),
    #     body: post.body,
    #     timestamp: post.created_at
    #   }
    # end

    tags = profile.profile_taggings.map do |tagging|
      {
        id: tagging.tag.id, 
        name: tagging.tag.name,
        strength: tagging.strength 
      }
    end

    render json: {
      profile: {
        name: profile.name,
        about_me: profile.about_me,
        quote: profile.quote,
        profile_image: url_for(profile.profile_image),
        cover_image: url_for(profile.cover_image),
        posts: posts,
        interested_posts: interested_posts,
        tags: tags
      }
    }
  end


  def edit

    # edit profile things here
    # cover image
    # profile image
    # about me
    # tags (bool)  
    #   -strength
    #   -struggle
  end

end

# data response 
# click on Profile
# pass the id and pull the data for that Profile 

