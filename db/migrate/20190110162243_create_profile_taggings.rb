class CreateProfileTaggings < ActiveRecord::Migration[5.2]
  def change
    create_table :profile_taggings do |t|
      t.belongs_to :profile, foreign_key: true
      t.belongs_to :tag, foreign_key: true
      t.boolean :strength

      t.timestamps
    end
  end
end
