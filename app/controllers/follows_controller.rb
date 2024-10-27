class FollowsController < ApplicationController
  before_action :set_user, only: [ :create, :destroy ]

  def create
    @follow = Current.session.user.follows_as_follower.build(followed_user: @user)

    respond_to do |format|
      if @follow.save
        format.turbo_stream
      else
        format.turbo_stream { render "error" }
      end
    end
  end

  def destroy
    @follow = Current.session.user.follows_as_follower.find_by!(followed_user: @user)

    respond_to do |format|
      if @follow.destroy
        format.turbo_stream
      else
        format.turbo_stream { render "error" }
      end
    end
  end

  private def set_user
    @user = User.find(params[:user_id])
  end
end
