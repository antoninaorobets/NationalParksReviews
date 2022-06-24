class ImageSerializer < ActiveModel::Serializer
  attributes :id, :title, :alt_text, :caption, :url, :park_id
end
