class Profile < ApplicationRecord
  has_many :authored_posts, class_name: "Post"

  has_one_attached :profile_image
  has_one_attached :cover_image

  has_many :profile_taggings
  has_many :tags, through: :profile_taggings

  has_many :interested_posts
  has_many :posts, through: :interested_posts
end
