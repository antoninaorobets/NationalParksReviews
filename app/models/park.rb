class Park < ApplicationRecord
    has_many :images, dependent: :destroy
    has_many :comments
    has_many :users, through: :comments
end
