class Settings::AvatarsController < ApplicationController
  before_action :authenticate_user!
  
  def update
    @user = current_user
    if @user.update(avatar: params[:user][:avatar])
      flash.now[:success] = 'Your avatar was successfully updated.'
    else
      @user.reload.avatar
      flash.now[:error] = @user.errors.full_messages_for(:avatar).first
    end

    render "settings/accounts/edit"
  end
end
