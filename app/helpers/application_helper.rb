# frozen_string_literal: true

module ApplicationHelper
  # A Hash of information about the application
  # and other details.
  #
  # Returns a Hash.
  def application_info
    {
      locale: I18n.locale
    }
  end
end
