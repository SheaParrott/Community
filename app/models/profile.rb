class Profile < ApplicationRecord
  has_many :posts
  has_one_attached :profile_image
  has_one_attached :cover_image
end
