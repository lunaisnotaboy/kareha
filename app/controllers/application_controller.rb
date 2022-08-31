# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  # Add custom User attributes to the pre-existing Devise parameters
  def configure_permitted_parameters
    added_attrs = %i[username email bio password password_confirmation remember_me avatar banner]
    devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
    devise_parameter_sanitizer.permit :sign_in, keys: %i[email password]
    devise_parameter_sanitizer.permit :account_update, keys: added_attrs
  end
end
