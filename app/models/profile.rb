require 'open-uri'

class Profile < ApplicationRecord
  has_many :authored_posts, class_name: "Post", foreign_key: :profile_id, dependent: :destroy

  has_one_attached :profile_image
  has_one_attached :cover_image

  has_many :profile_taggings, dependent: :destroy
  has_many :tags, through: :profile_taggings

  has_many :interested_posts, dependent: :destroy
  has_many :posts, through: :interested_posts
  
  # These are the post taggings with the same tags as those that I'm interested in
  has_many :post_taggings, through: :tags
  # Then we can ask the post taggings for all those posts
  has_many :recommended_posts, through: :post_taggings, class_name: "Post", source: :post

  # Comments I have made
  has_many :comments, dependent: :destroy

  # Comments on posts I have writen
  has_many :post_comments, through: :authored_posts, class_name: "Comment", source: :comments

  # trying to get recent comments from author_posts
  # has_many :notifications, class_name: "comment", foreign_key: :comment_id, dependent: :destroy
  # has_many :notifications, through :authored_posts

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
