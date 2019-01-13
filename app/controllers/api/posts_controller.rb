class Api::PostsController < ApplicationController

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
    new_post = current_profile.posts.create(post_params)

    # Just say all is ok...
    render head: :ok
  end 

  def show
    post_id = params[:id]

    post = Post.find(post_id)

    # profile = Post.find

    render json: {
      post: {
        id: post.id,
        title: post.title, 
        image: url_for(post.post_image),
        body: post.body, 
        time: post.created_at,
        profile_id: post.author.id, 
        profile_name: post.author.name, 
        profile_image: url_for(post.author.profile_image)
      }
    }
  end



  private

  def post_params
    params.require(:post).permit(:title, :post_image, :body, tag_ids: [])
  end
end




# {
#   post: {
#     title: "title of post",
#     image: "image here"
#     body: "alot of text is put here",
#     tags: []
#   }
# }