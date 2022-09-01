# frozen_string_literal: true

require 'sidekiq/web'

Kareha::Application.routes.draw do
  # Devise-specific URLs
  devise_for :users

  # Verify that users are administrators before granting access to these URLs
  authenticate :user, ->(user) { user.admin? } do
    mount Sidekiq::Web => '/sidekiq'
  end

  get '/status', to: 'status#plain'

  get '/(*any)', to: 'pwa#index', as: :web

  root 'pwa#root_fallback'
end
