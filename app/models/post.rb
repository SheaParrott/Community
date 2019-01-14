class Post < ApplicationRecord
  belongs_to :author, class_name: "Profile", foreign_key: :profile_id

  # do i need this for my endpoint to 
  # create a post with many tags?
  has_many :post_taggings

  # This also creates a few methods for is
  #    tags
  #    tags=
  #    tags.new
  #    tags.create
  #    tag_ids
  #    tag_ids=
  has_many :tags, through: :post_taggings

  has_one_attached :post_image  

  has_many :interested_posts
  has_many :profiles, through: :interested_posts

  has_many :comments
  

  # // data needed from api
  # // - profile pic
  # // - profile name
  # // - post.created
  # // - post.title
  # // - post.image
  # // - post.body

  # // post comments
  # // - profile.image
  # // - profile.name
  # // - comment.body
end
