class Api::PostsController < ApplicationController
  # skip_before_action :verify_authenticity_token

  # needs to be done in post controller
  
  # post "/api/post/create" 

  def create 

    # <input type="text" name="post[title]" />
    # <input type="text" name="post[body]" />

    # Makes an array of checked ids into  "post[tag_ids]"
    # and since we allow that throw. *AND* since Post `has_many` tags
    # we get the `tag_ids=` method to associate tags to posts.

    # <input type="checkbox" value="1" name="post[tag_ids][]" />
    # <input type="checkbox" value="2" name="post[tag_ids][]" />
    # <input type="checkbox" value="7" name="post[tag_ids][]" />


    #    { "post" => { "title" => "Whoa!", "body" => "Nice!", "tag_ids" => [1, 2, 7] } }

    # Make a new post, but associate it to the currently logged in Profile
    new_post = current_profile.authored_posts.create!(post_params)

    # Just say all is ok...
    render head: :ok
  end 

def show
  post_id = params[:id]

  post = Post.find(post_id)

  comments = post.comments.map do |comment|
    {
      id: comment.id,
      current_profile_author: if comment.profile.id == current_profile.id then true else false end,
      body: comment.body,
      author_id: comment.profile.id,
      author_image: comment.profile.profile_image.attached? && url_for(comment.profile.profile_image),
      author_name: comment.profile.name
    }
  end

  render json: {
    post: {
      id: post.id,
      current_profile_author: if post.author.id == current_profile.id then true else false end,
      title: post.title, 
      image: post.post_image.attached? && url_for(post.post_image),
      body: post.body, 
      time: post.created_at,
      profile_id: post.author.id, 
      profile_name: post.author.name, 
      profile_image: post.author.profile_image.attached? && url_for(post.author.profile_image),
      comment_count: comments.size,
      comments: comments
    }
  }
  end


  # /api/posts
  def destroy 

    Post.find(params[:id]).destroy
  end


  private
  
  def post_params
    params.require(:post).permit(:title, :post_image, :body, tag_ids: [])
  end
end

# Comment.create!(profile: gavin, post: postOne, body: "thannnkkkksss")



# {
#   post: {
#     title: "title of post",
#     image: "image here"
#     body: "alot of text is put here",
#     tags: []
#   }
# }