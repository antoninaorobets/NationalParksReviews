class CommentSerializer < ActiveModel::Serializer
  attributes :id, :text, :created_at, :park_id
  has_one :user
  # belongs_to :park
end
