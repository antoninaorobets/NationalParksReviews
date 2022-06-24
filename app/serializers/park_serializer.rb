class ParkSerializer < ActiveModel::Serializer
  attributes :id, :name, :full_name, :park_code, :description, :states, :directions_info, :address, :weather_info, :designation, :url

  has_many :images
  has_many :comments
end
