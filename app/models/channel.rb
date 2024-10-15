class Channel < ApplicationRecord
  belongs_to :user
  has_many :messages, dependent: :destroy

  def formatted_stream_key
    if self.stream_key
      "#{self.user.username}?pass=#{self.stream_key}"
    end
  end
end
