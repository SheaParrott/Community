class Post < ApplicationRecord
  validates :title, presence: true
  validate :must_have_at_least_one_tag

  belongs_to :author, class_name: "Profile", foreign_key: :profile_id

  has_many :post_taggings, dependent: :destroy
  has_many :tags, through: :post_taggings

  has_one_attached :post_image  

  has_many :interested_posts, dependent: :destroy
  has_many :profiles, through: :interested_posts

  has_many :comments, dependent: :destroy
  
  def must_have_at_least_one_tag
    if tags.size < 1
      errors.add(:tags, "can't be empty")
    end
  end

end
