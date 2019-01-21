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

  after_create :make_default_posts

  # trying to get recent comments from author_posts
  # has_many :notifications, class_name: "comment", foreign_key: :comment_id, dependent: :destroy
  # has_many :notifications, through :authored_posts

  def make_default_posts
    admin = Tag.find_by(name: "admin")
    authored_posts.build(title: "Admin - Welcome to the Community!", body: "Here in the Community our goal is to provide a safe place to help one another and spread good vibes. This is a platform to seek out assistance, help others, build up the community, and maybe even pick up a new hobby", tags: [admin])
    authored_posts.build(title: "Admin - Looking to make your profile your own?", body: "Click on you profile image for customization options. There you can update your profile image, cover image, quote, about me, and your tags", tags: [admin])
    authored_posts.build(title: "Admin - Ready to explore and see what the Community has to offer?", body: "Click on your profile image and select some tags. This will start populating your recommended posts section on your profile.", tags: [admin])
    authored_posts.build(title: "Admin - See a post you would like to keep track of?", body: "Click the magnet icon, this will add that post to you interested posts section on your profile.", tags: [admin])
    authored_posts.build(title: "Admin - Trying to find your the tags you have already chosen?", body: "Click in the STREGTHS / GROWING section at the top of you're profile. This is a complete list of tags you have currently chosen.", tags: [admin])
    authored_posts.build(title: "Admin - Oops, did you create your post before you were finished with it?", body: "No problem, click on the menu bar located at the top right of the post. This will give you an opportunity to delete that posts and start again.", tags: [admin])
    authored_posts.build(title: "Admin - Trying to stay connected?", body: "Click the notifications bell located on the top right of the header. This will take you to your notifications box.", tags: [admin])
    authored_posts.build(title: "Admin - Trying to get back to your profile?", body: "Click the Community icon loacted in the middle of the header. This will take you back to your profile.", tags: [admin])
    authored_posts.build(title: "Admin - Have any questions about this platform or the creator?", body: "Click on the contact me link located at the bottom left of the footer. All inquiries are appreciated and welcome.", tags: [admin])
    authored_posts.build(title: "Admin - Nice, your ready!", body: "Go to take on the world, well the Community's world. Create a post, connect to other people through their posts and give them a comment. Have fun and spread good vibes!", tags: [admin])
  
  end

  def self.from_auth_hash(payload)
    Profile.find_or_create_by!(auth_sub: payload["sub"]) do |profile|
      Rails.logger.debug payload

      profile.profile_image.attach(io: open(payload["picture"]),
                                   filename: "profile.png")

      # profile.avatar_url = payload["picture"]
      profile.name = payload["name"]
    end
  end
end
