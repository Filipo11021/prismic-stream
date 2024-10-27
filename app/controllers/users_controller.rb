require "securerandom"

class UsersController < ApplicationController
  allow_unauthenticated_access only: %i[ new create ]

  def new
    @user = User.new
  end

  def create
    ActiveRecord::Base.transaction do
      @user = User.new(params.permit(:username, :email_address, :password))

      if @user.save
        @channel = @user.build_channel

        # If channel creation fails, rollback the user creation as well.
        unless @channel.save
          raise ActiveRecord::Rollback
        end
      else
        raise ActiveRecord::Rollback
      end
    end

    unless @user.persisted? and @channel.persisted?
      render :new, status: :unprocessable_entity and return
    end

    start_new_session_for @user
    redirect_to after_authentication_url
  end

  def new_avatar
    @user = Current.user
    @user.avatar.attach(params[:avatar])

    if @user.avatar.attached?
      respond_to do |format|
        format.turbo_stream { render turbo_stream: turbo_stream.update(helpers.dom_id(User, :avatar), "<img src='#{url_for(@user.avatar)}'/>") }
      end
    else
      render :show, status: :unprocessable_entity
    end
  end
end
