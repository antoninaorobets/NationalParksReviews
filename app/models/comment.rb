class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :park

  validates :text, presence: true
end
