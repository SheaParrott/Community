class Api::ProfilesController < ApplicationController

  def update
    current_profile.update(profile_params)

    render json: current_profile
  end

  def current
    
    profile = current_profile
    # current authored posts
    posts = profile.authored_posts.map do |post|
      {
        id: post.id,
        current_profile_author: if post.author.id == current_profile.id then true else false end,
        title: post.title,
        image: post.post_image.attached? && url_for(post.post_image),
        body: post.body,
        comment_count: post.comments.count,
        timestamp: post.created_at,
      }
    end

    # current interrested posts
    interested_posts = profile.posts.map do |post|
      {
        id: post.id,
        current_profile_author: if post.author.id == current_profile.id then true else false end,
        title: post.title,
        image: post.post_image.attached? && url_for(post.post_image),
        body: post.body,
        timestamp: post.created_at, 
        author_id: post.author.id, 
        name: post.author.name, 
        comment_count: post.comments.count,
        profile_image: post.author.profile_image.attached? && url_for(post.author.profile_image),
      }
    end

    # current recommended posts
    recommended_posts = profile.recommended_posts.map do |post|
      {
        id: post.id,
        current_profile_author: if post.author.id == current_profile.id then true else false end,
        title: post.title,
        image: post.post_image.attached? && url_for(post.post_image),
        body: post.body,
        timestamp: post.created_at, 
        author_id: post.author.id, 
        name: post.author.name, 
        comment_count: post.comments.count,
        profile_image: post.author.profile_image.attached? && url_for(post.author.profile_image),
      }
    end

    # current chosen profile tags
    tags = profile.profile_taggings.map do |tagging|
      {
        id: tagging.tag.id, 
        name: tagging.tag.name,
        strength: tagging.strength 
      }
    end

    # current render
    render json: {
      profile: {
        id: profile.id,
        name: profile.name,
        about_me: profile.about_me,
        quote: profile.quote,
        profile_image: profile.profile_image.attached? && url_for(profile.profile_image),
        cover_image: profile.cover_image.attached? && url_for(profile.cover_image),
        posts: posts,
        interested_posts: interested_posts,
        recommended_posts: recommended_posts,
        tags: tags,
        me: true
      }
    }

  end


  def show
    profile_id = params[:id]

    profile = Profile.find(profile_id)

    #list of people interested in a post




    # show authored posts
    posts = profile.authored_posts.map do |post|
      {
        id: post.id,
        current_profile_author: if post.author.id == current_profile.id then true else false end,
        title: post.title,
        image: post.post_image.attached? && url_for(post.post_image),
        body: post.body,
        comment_count: post.comments.count,
        author_id: post.author.id,
        timestamp: post.created_at,
      }
    end

    # show authored posts
    interested_posts = profile.posts.map do |post|
      {
        id: post.id,
        current_profile_author: if post.author.id == current_profile.id then true else false end,
        title: post.title,
        image: post.post_image.attached? && url_for(post.post_image),
        body: post.body,
        comment_count: post.comments.count,
        timestamp: post.created_at, 
        author_id: post.author.id, 
        name: post.author.name, 
        profile_image: post.author.profile_image.attached? && url_for(post.author.profile_image),

      }
    end

    # current recommended posts
    recommended_posts = profile.recommended_posts.map do |post|
      {
        id: post.id,
        # is_author
        current_profile_author: post.author.id == current_profile.id,
        title: post.title,
        image: post.post_image.attached? && url_for(post.post_image),
        body: post.body,
        timestamp: post.created_at, 
        author_id: post.author.id, 
        name: post.author.name, 
        comment_count: post.comments.count,
        profile_image: post.author.profile_image.attached? && url_for(post.author.profile_image),
      }
    end

    # show chosen profile tags
    tags = profile.profile_taggings.map do |tagging|
      {
        id: tagging.tag.id, 
        name: tagging.tag.name,
        strength: tagging.strength 
      }
    end

    # notifications = profile.notifications.map do |notification|
    #   {
    #     id: notifications.id, 
    #     name: notifications.author_id, 
    #     profile_image: notifications.author.profile_image.attached? && url_for(notifications.author.profile_image)
    #     post_id: 
    #   }
    # end

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
        interested_posts: interested_posts,
        recommended_posts: recommended_posts,
        tags: tags,
        me: false, 
        # notifications: notifications
      }
    }
  end
  
  private

  def profile_params
    params.require(:profile).permit(:cover_image, :profile_image, :about_me, :name, tag_ids: [])
  end


end

