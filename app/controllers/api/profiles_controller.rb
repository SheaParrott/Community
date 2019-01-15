class Api::ProfilesController < ApplicationController
  # skip_before_action :verify_authenticity_token

  def update
    current_profile.update(profile_params)

    render json: current_profile
  end


# [] how can i get the notifications bar to show when a person 
#    comments on my post?
#   - thinking this may be another model? (viewed:boolean profile:belongs to)
# most recent 10 'comments'

# [] to do:
#   - set up count for number of comments and have it return
#     anytime we get a post.
#   - make magnet add to interested posts
#   - get list of people interested in a post
#   - set up count of people interested in a post
#   - delete post, button and id select id in place already




  def current
    profile = current_profile

    # current authored posts
    posts = profile.authored_posts.map do |post|
      {
        id: post.id,
        title: post.title,
        image: post.post_image.attached? && url_for(post.post_image),
        body: post.body,
        comment_count: post.comments.count,
        timestamp: post.created_at
      }
    end

    # current interrested posts
    interested_posts = profile.posts.map do |post|
      {
        id: post.id,
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

    # current recommented posts
    # recommended_posts = profile. do |post|
    #   {
    #     id: post.id,
    #     title: post.title,
    #     image: url_for(post.post_image),
    #     body: post.body,
    #     timestamp: post.created_at
    #   }
    # end

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
        recommended_posts: [],
        tags: tags,
        me: true
      }
    }

  end


  def show
    profile_id = params[:id]

    profile = Profile.find(profile_id)

    # show authored posts
    posts = profile.authored_posts.map do |post|
      {
        id: post.id,
        title: post.title,
        image: post.post_image.attached? && url_for(post.post_image),
        body: post.body,
        comment_count: post.comments.count,
        author_id: post.author.id,
        timestamp: post.created_at
      }
    end

    # show authored posts
    interested_posts = profile.posts.map do |post|
      {
        id: post.id,
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

    #  show recommened posts
    # recommended_posts = profile. do |post|
    #   {
    #     id: post.id,
    #     title: post.title,
    #     image: url_for(post.post_image),
    #     body: post.body,
    #     timestamp: post.created_at
    #   }
    # end

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
        interested_posts: interested_posts,
        recommended_posts: [],
        tags: tags,
        me: false
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


  # /api/profiles/:id/recommendedPosts
  def recommendedPosts 
    profile_id = params[:id]

    profile = Profile.find(profile_id)
    #get all recommended posts
    # need to set up relationships on this
    # before we can complete this
  end


  private

  def profile_params
    params.require(:profile).permit(:cover_image, :profile_image, :about_me, :name, tag_ids: [])
  end


end

# data response 
# click on Profile
# pass the id and pull the data for that Profile 


# create the route in route.rb
# set up json return
# link to needs to match the urls created
# when then does the axios call 
# this.props.match.params for
#  axios call i believe

# endpoint /api/profiles/:id/recommendedPosts
# endpoint /api/profiles/:id/interestedPosts
