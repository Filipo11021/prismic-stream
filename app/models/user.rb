class User < ApplicationRecord
  has_secure_password
  has_many :sessions, dependent: :destroy
  has_one :channel, dependent: :destroy
  has_one_attached :avatar

  normalizes :email_address, with: ->(e) { e.strip.downcase }

  validates :username, presence: true, uniqueness: true
  validates :email_address, presence: true, uniqueness: true
end
