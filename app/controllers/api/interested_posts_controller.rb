class Api::InterestedPostsController < ApplicationController
     # all options [:show, :create, :index, :destroy]

  #  to do:
  #   [x] fix how we know which profile we are on from hard coded 
  #   to dynamic
  #   []change how we get interested or recommended posts
  #   for now lets just use the profile endpoint,
  #    but need to make a endpoint for each of these to 
  #    reduce the amount of data recieved
  #   [x] change all the endpoint names in the controllers
  #   [x] change all the api calls in React

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

  #   render json: {
  #     profile: {
  #       interested_posts: interested_posts.to_set,
  #       recommended_posts: recommended_posts.to_set,
  #       tags: tags,
  #       me: false, 
  #     }
  #   }
  # end

  def show
    # return interested posts
    profile_id = params[:id]

    profile = Profile.find(profile_id)

    interested_posts = profile.interested_posts

    def get_posts (posts)
      posts.map do |post|
        post_details(post)
        end
    end

    interested_posts = get_posts(profile.posts.uniq)   

    render json: {
        posts: interested_posts.to_set
    }
  end


  def create
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

  def interested_posts_params
    params.require(:interested_post).permit(:post_id)
  end
end
