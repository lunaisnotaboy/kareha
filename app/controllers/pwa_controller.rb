# frozen_string_literal: true

class PWAController < ApplicationController
  def index; end

  def root_fallback
    render 'index'
  end
end
