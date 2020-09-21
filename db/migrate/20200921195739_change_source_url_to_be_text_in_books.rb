class ChangeSourceUrlToBeTextInBooks < ActiveRecord::Migration[6.0]
  def change
    change_column :books, :source_url, :text, null: false
  end
end
