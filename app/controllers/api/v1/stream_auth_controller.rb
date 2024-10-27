class Api::V1::StreamAuthController < ApplicationController
  skip_before_action :verify_authenticity_token
  allow_unauthenticated_access

  def validate
    data = StreamAuthRequest.new(stream_auth_params)

    unless data.valid?
      render json: { success: false, errors: data.errors }, status: :unprocessable_entity and return
    end

    stream_key = data.password
    channel_id = data.path

    @channel = Channel.find_by(id: channel_id)

    authorized_stream = @channel.stream_key ? @channel.stream_key == stream_key : false
    requires_validation = data.protocol != "hls"

    if authorized_stream or not requires_validation
      render json: { success: true }, status: :ok and return
    end

    render json: { success: false }, status: :unauthorized
  end

  def stream_auth_params
    params.delete(:stream_auth)
    params.permit(:user, :password, :ip, :action, :path, :protocol, :id, :query)
  end
end
