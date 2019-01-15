class Api::CommentsController < ApplicationController
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


    # create a comment here. params body
    # need the current profile id  current_profile
    # need the current post id  params post
    post_id = params[id]

    post = Post.find(post_id)

    comment = Comment.create(comment_params)

    found_post = current_profile.post.comment

    # Just say all is ok...
    render head: :ok
  end 


  private

  def comment_params
    params.require(:comment).permit(:body)
end
