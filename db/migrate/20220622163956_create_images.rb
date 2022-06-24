class CreateImages < ActiveRecord::Migration[7.0]
  def change
    create_table :images do |t|
      t.string :title
      t.string :alt_text
      t.string :caption
      t.string :url
      t.references :park, null: false, foreign_key: true

      t.timestamps
    end
  end
end
