class User < ApplicationRecord
  has_secure_password
  has_many :sessions, dependent: :destroy

  has_one :channel, dependent: :destroy
  has_one_attached :avatar

  has_many :follows_as_follower,
  class_name: "Follow",
  foreign_key: :follower_id,
  dependent: :destroy

has_many :follows_as_followed,
  class_name: "Follow",
  foreign_key: :followed_user_id,
  dependent: :destroy

  has_many :followed_users, through: :follows_as_follower, source: :followed_user
  has_many :followers, through: :follows_as_followed, source: :follower

  normalizes :email_address, with: ->(e) { e.strip.downcase }

  validates :username, presence: true, uniqueness: true
  validates :email_address, presence: true, uniqueness: true
  validates :password, presence: true, on: :create, length: { minimum: 8 }
end
