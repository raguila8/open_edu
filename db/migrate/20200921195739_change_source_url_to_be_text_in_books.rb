class ChangeSourceUrlToBeTextInBooks < ActiveRecord::Migration[6.0]
  def up
    change_column :books, :source_url, :text, null: false
  end

  def down
    change_column :books, :source_url, :string
  end
end
