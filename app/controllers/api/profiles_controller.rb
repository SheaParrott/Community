class Api::ProfilesController < ApplicationController

  def update
    params = profile_params

    current_profile.update(params)

    render json: current_profile
  end

  def show
    if params[:id] == "undefined" then
      profile_id = current_profile.id
      profile = Profile.find(profile_id)
    else 
      profile_id = params[:id]
      profile = Profile.find(profile_id)
    end 


    # show authored posts
    posts = profile.authored_posts.map do |post|
      post_details(post)
    end


    def get_posts (posts)
      posts.map do |post|
        post_details(post)
      end
    end

    interested_posts = get_posts(profile.posts.uniq)    

    recommended_posts = get_posts(profile.recommended_posts.uniq)

    recommended_posts = recommended_posts.select{ |post| post[:current_profile_author] == false}

    # show chosen profile tags
    tags = profile.profile_taggings.map do |tagging|
      {
        id: tagging.tag.id, 
        name: tagging.tag.name,
        strength: tagging.strength 
      }
    end

    # show render
    render json: {
      profile: {
        id: profile.id,
        name: profile.name,
        about_me: profile.about_me,
        quote: profile.quote,
        profile_image: profile.profile_image.attached? && url_for(profile.profile_image),
        cover_image: profile.cover_image.attached? && url_for(profile.cover_image),
        posts: posts,
        interested_posts: interested_posts.to_set,
        recommended_posts: recommended_posts.to_set,
        tags: tags,
        me: profile.id == current_profile.id,   
      }
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

  def profile_params
    params.require(:profile).permit(:cover_image, :profile_image, :quote, :about_me, tag_ids: [])
  end


end

