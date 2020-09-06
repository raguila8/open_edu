class Settings::AccountsController < ApplicationController
  before_action :authenticate_user!

  def edit
    @user = current_user
  end

  def update
    @user = current_user
    if @user.update(user_params)
      flash.now[:success] = 'Your account was successfully updated.'
    end

    render :edit
  end

  private

    def user_params
      params.require(:user).permit(:name, :email)
    end
end
