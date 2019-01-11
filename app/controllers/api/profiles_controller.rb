class Api::ProfilesController < ApplicationController
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
        timestamp: post.created_at
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

    tags = profile.tags.map do |tag|
      {
        tag_id: tag.id, 
        tag_name: tag.name, 
        # tag_strength: profile.profile_tag
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
end

# data response 
# click on Profile
# pass the id and pull the data for that Profile 

# profile: {
#   name: 'shea',
#   about_me: 'I enjoy learning and growing through challenges',
#   quote: 'resilience',
#   profile_image: profileimg,
#   cover_image: coverimg,
#   posts: [
#     {
#       id: 1,
#       title: 'How to do stuff',
#       image: requestimg,
#       body: 'blah blah',
#       timestamp: '2/8/18'
#     },
#     {
#       id: 2,
#       title: 'How to do more stuff',
#       image: requestimg,
#       body: 'blah blah',
#       timestamp: '2/5/18'
#     },
#     {
#       id: 3,
#       title: 'How do i get this backend stuff down?',
#       image: requestimg,
#       body: 'resilence i guess? meet up this weekend?',
#       timestamp: '2/7/18'
#     }
#   ]
# }
