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

#   # [x , x, ] posts the user made, then post tagging, then interestedpost for one use to this post 
# postOne  = gavin.authored_posts.create!(title: "About SDG", body: "blah blah blah")
# postOne .post_image.attach(io: image('client/src/assets/dev.jpeg'), filename: 'dev.jpeg')

# # [-, x, -] create a bunch of of post taggings. associate posts with multiple tags
# PostTagging.create!(post: postOne , tag: gaming)
# PostTagging.create!(post: postOne , tag: web)
# PostTagging.create!(post: postOne , tag: networking)



  private

  def post_params
    params.require(:post).permit(:title, :body, tag_ids: [])
  end
end