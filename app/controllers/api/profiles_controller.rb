class Api::ProfilesController < ApplicationController
   # all options [:show, :create, :index, :destroy]
  #  Prefix Verb  URI Pattern                 Controller#Action
  #  api_profile GET   /api/profiles/:id(.:format) api/profiles#show
  #              PATCH /api/profiles/:id(.:format) api/profiles#update
  #              PUT   /api/profiles/:id(.:format) api/profiles#update

  #  to do:
  #   [x] fix how we know which profile we are on from hard coded 
  #   to dynamic
  #   []change how we get interested or recommended posts
  #   for now lets just use the profile endpoint,
  #    but need to make a endpoint for each of these to 
  #    reduce the amount of data recieved
  #   [] change all the endpoint names in the controllers
  #   [] change all the api calls in React

  # def interested_or_recommended
  #   profile_id = params[:id]

  #   profile = Profile.find(profile_id)

  #   def get_posts (posts)
  #     posts.map do |post|
  #       post_details(post)
  #     end
  #   end

  #   interested_posts = get_posts(profile.posts.uniq)    

  #   recommended_posts = get_posts(profile.recommended_posts.uniq)

  #   recommended_posts = recommended_posts.select{ |post| post[:current_profile_author] == false}

  #   # show chosen profile tags
  #   tags = profile.profile_taggings.map do |tagging|
  #     {
  #       id: tagging.tag.id, 
  #       name: tagging.tag.name,
  #       strength: tagging.strength 
  #     }
  #   end


  #   # show render
  #   render json: {
  #     profile: {
  #       interested_posts: interested_posts.to_set,
  #       recommended_posts: recommended_posts.to_set,
  #       tags: tags,
  #       me: false, 
  #     }
  #   }
  # end


  def update
    params = profile_params


    # if(!profile_params[:quote].present? && profile_params[:about_me].present?)
    #   params = no_quote
    # elsif(!profile_params[:about_me].present? && profile_params[:quote].present?) 
    #   params = no_about_me
    # elsif(!profile_params[:quote].present? && !profile_params[:about_me].present?)
    #   params = no_quote_no_about_me
    # end  
    current_profile.update(params)

    render json: current_profile
  end

  # def current
  #   profile = current_profile
  #   # current authored posts

  #   posts = profile.authored_posts.map do |post|
  #     post_details(post)
  #   end

  #   def get_posts (posts)
  #     posts.map do |post|
  #       post_details(post)
  #     end
  #   end

  #   interested_posts = get_posts(profile.posts.uniq)   

  #   recommended_posts = get_posts(profile.recommended_posts.uniq)

  #   recommended_posts = recommended_posts.select{ |post| post[:current_profile_author] == false}

  #   # current chosen profile tags
  #   tags = profile.profile_taggings.map do |tagging|
  #     {
  #       id: tagging.tag.id, 
  #       name: tagging.tag.name,
  #       strength: tagging.strength 
  #     }
  #   end

  #   render json: {
  #     profile: {
  #       id: profile.id,
  #       name: profile.name,
  #       about_me: profile.about_me,
  #       quote: profile.quote,
  #       profile_image: profile.profile_image.attached? && url_for(profile.profile_image),
  #       cover_image: profile.cover_image.attached? && url_for(profile.cover_image),
  #       posts: posts,
  #       interested_posts: interested_posts.to_set,
  #       recommended_posts: recommended_posts.to_set,
  #       tags: tags,
  #       me: profile.id == current_profile.id,   
  #     }
  #   }
  # end


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


  def no_quote
    params.require(:profile).permit(:cover_image, :profile_image, :about_me, tag_ids: [])
  end

  def no_about_me
      params.require(:profile).permit(:cover_image, :profile_image, :quote, tag_ids: [])
  end

  def no_quote_no_about_me
      params.require(:profile).permit(:cover_image, :profile_image, tag_ids: [])   
  end

  def profile_params
    params.require(:profile).permit(:cover_image, :profile_image, :quote, :about_me, tag_ids: [])
  end


end

