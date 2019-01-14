class AddAuthSubToProfile < ActiveRecord::Migration[5.2]
  def change
    add_column :profiles, :auth_sub, :text
  end
end
