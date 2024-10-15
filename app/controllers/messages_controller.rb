class MessagesController < ApplicationController
  def create
    @channel = Channel.find(params[:channel_id])
    @message = @channel.messages.new(message_params)
    @message.user = Current.session.user

    if @message.save
      ActionCable.server.broadcast("messages_#{@channel.id}", {
        html: ApplicationController.render(
          partial: "messages/message",
          locals: { message: @message }
        )
      })

      head :ok
    else
      render json: { error: @message.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def message_params
    params.require(:message).permit(:content)
  end
end
