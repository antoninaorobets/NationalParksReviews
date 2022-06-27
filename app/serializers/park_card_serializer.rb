class ParkCardSerializer < ActiveModel::Serializer
  attributes :id, :name, :full_name, :park_code, :description, :states
  has_many :images
end
