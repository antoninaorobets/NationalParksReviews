class ParkCardSerializer < ActiveModel::Serializer
  attributes :id, :name, :full_name, :park_code, :description, :states
end
