class Settings::PasswordsController < ApplicationController
  before_action :authenticate_user!

  def edit
    @user = current_user
  end

  def update
    @user = current_user
    if @user.update_with_password(user_password_params)
      # Sign in the user by passing validation in case their password changed
      bypass_sign_in(@user)
      flash.now[:success] = 'Your password was successfully changed.'
    end

    render :edit
  end

  private

    def user_password_params
      params.require(:user).permit(:password, :password_confirmation, :current_password)
    end
end
