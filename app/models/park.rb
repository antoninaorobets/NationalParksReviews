class Park < ApplicationRecord
    has_many :images, dependent: :destroy
    has_many :comments, dependent: :destroy
    has_many :users, through: :comments
end
