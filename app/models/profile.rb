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
  after_create :default_tags

  def default_tags
    tags << Tag.all.where.not(name: "admin")
    # is_admin_tag: post.tags.where(name: "admin").any?
  end


  def make_default_posts
    admin = Tag.find_by(name: "admin")
    authored_posts.create(title: "Admin - Welcome to the Community!", body: "Looking to personalize your profile? Click on you profile image for all customization options. Make sure to select some tags, this what controls the posts you see in recommended posts feature. See a post you want to follow? Click the like icon, this will add that post to you interested posts located on your profile page.", tags: [admin])
  end

  def interested?(post)
    # "posts" are the posts we are interested in
    posts.include?(post)
  end

  def self.from_auth_hash(payload)
    Profile.find_or_create_by!(auth_sub: payload["sub"]) do |profile|
      Rails.logger.debug payload

      begin
        picture = Down.download(payload["picture"])
        profile.profile_image.attach(io: picture, filename: picture.original_filename)
      rescue Down::Error => exception
        Rails.logger.info exception
      end

      profile.name = payload["name"]
    end
  end
end
