class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :masquerade_user!

  layout :layout_by_resource

  protected

    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
      devise_parameter_sanitizer.permit(:account_update, keys: [:name, :avatar])
    end

    def layout_by_resource
      if devise_controller? or (controller_name == "home" and action_name == "landing")
        if controller_name == "registrations" and action_name == "edit"
          "application"
        else
          "plain"
        end
      else
        "application"
      end
    end
end
