class CreateProfiles < ActiveRecord::Migration[5.2]
  def change
    create_table :profiles do |t|
      t.text :name
      t.text :about_me
      t.text :quote


      t.timestamps
    end
  end
end
