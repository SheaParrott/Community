class ProfileTagging < ApplicationRecord
  belongs_to :profile
  belongs_to :tag

  has_many :post_taggings, through: :tag
  has_many :recommended_posts, through: :post_taggings, class_name: "Post", source: :post
end
