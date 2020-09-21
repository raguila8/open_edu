class CreateResourcesTags < ActiveRecord::Migration[6.0]
  def change
    create_table :resources_tags do |t|
      t.references :tag, null: false, foreign_key: true
      t.references :resources, polymorphic: true, null: false

      t.timestamps
    end
  end
end
