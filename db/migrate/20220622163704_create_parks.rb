class CreateParks < ActiveRecord::Migration[7.0]
  def change
    create_table :parks do |t|
      t.string :name
      t.string :full_name
      t.string :park_code
      t.string :description
      t.string :states
      t.string :directions_info
      t.string :operating_hours
      t.string :address
      t.string :weather_info
      t.string :designation
      t.string :url
      t.string :api_id

      t.timestamps
    end
  end
end
