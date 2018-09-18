class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name
      t.integer :points
      t.string :favorites

      t.timestamps
    end
  end
end
