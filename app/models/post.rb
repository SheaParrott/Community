class Post < ApplicationRecord
  belongs_to :author, class_name: "Profile"

  has_many :tags, through: :post_taggings
  has_one_attached :post_image  

  has_many :interested_posts
  has_many :profiles, through: :interested_posts
end
