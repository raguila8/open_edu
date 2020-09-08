class CreateBooks < ActiveRecord::Migration[6.0]
  def change
    create_table :books do |t|
      t.string :title
      t.string :source_url
      t.integer :publication_year
      t.integer :publication_month
      t.integer :publication_day
      t.string :publisher
      t.integer :num_pages
      t.integer :level
      t.integer :status, null: false

      t.timestamps
    end
    add_index :books, :title
    add_index :books, :source_url, unique: true
  end
end
