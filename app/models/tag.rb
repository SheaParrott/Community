class Tag < ApplicationRecord
  has_many :profile_taggings, dependent: :destroy
  has_many :post_taggings, dependent: :destroy

  has_many :posts, through: :post_taggings
  has_many :profiles, through: :profile_taggings
end
