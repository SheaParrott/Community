require 'open-uri'

class Profile < ApplicationRecord
  has_many :authored_posts, class_name: "Post", foreign_key: :profile_id

  has_one_attached :profile_image
  has_one_attached :cover_image

  has_many :profile_taggings
  has_many :tags, through: :profile_taggings

  has_many :interested_posts
  has_many :posts, through: :interested_posts

  has_many :comments

  def self.from_auth_hash(payload)
    Profile.find_or_create_by(auth_sub: payload["sub"]) do |profile|
      Rails.logger.debug payload

      profile.profile_image.attach(io: open(payload["picture"]),
                                   filename: "profile.png")

      # profile.avatar_url = payload["picture"]
      profile.name = payload["name"]
    end
  end
end
