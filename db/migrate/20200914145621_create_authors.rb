class CreateAuthors < ActiveRecord::Migration[6.0]
  def change
    create_table :authors do |t|
      t.string :name, null: false
      t.text :about
      t.string :twitter_username
      t.text :website

      t.timestamps
    end

    add_index :authors, :name
  end
end
