class StreamAuthRequest
  include ActiveModel::Model

  attr_accessor :user, :password, :ip, :action, :path, :protocol, :id, :query

  # Validations
  validates :ip, :action, :path, :protocol, presence: true
  validates :action, inclusion: { in: %w[publish read playback api metrics pprof validate] }
  validates :protocol, inclusion: { in: %w[rtsp rtmp hls webrtc srt] }
end
