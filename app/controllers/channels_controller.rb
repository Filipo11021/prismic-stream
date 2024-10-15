class ChannelsController < ApplicationController
  def show
    @channel = Channel.includes(:user).find_by!(user: { username: params[:username] })
    @messages = @channel.messages.order(created_at: :asc)
  end

  def settings
    @user = Current.session.user
  end

  def new_stream_key
    @channel = Current.session.user.channel
    @channel.stream_key = SecureRandom.alphanumeric(250)

    if @channel.save
      respond_to do |format|
        format.turbo_stream
      end
    else
      render :show, status: :unprocessable_entity
    end
  end

  def new_title
    @channel = Current.session.user.channel
    @channel.title = params[:title]

    if @channel.save
      respond_to do |format|
        format.turbo_stream { render turbo_stream: turbo_stream.update(helpers.dom_id(Channel, :title), @channel.title) }
      end
    else
      render :show, status: :unprocessable_entity
    end
  end
end
