class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.string :title
      t.string :text
      t.integer :rating
      t.integer :user_id

      t.timestamps
    end
  end
end
