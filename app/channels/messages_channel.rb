class MessagesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "messages_#{params[:room]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
