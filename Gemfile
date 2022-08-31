# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '~> 3.0'

gem 'bcrypt', '~> 3.1', '>= 3.1.18'
gem 'bootsnap', '~> 1.13', require: false
gem 'dalli', '~> 3.2', '>= 3.2.2'
gem 'devise', '~> 4.8', '>= 4.8.1'
gem 'dotenv-rails', '~> 2.8', '>= 2.8.1'
gem 'hiredis', '~> 0.6.3'
gem 'image_processing', '~> 1.12', '>= 1.12.2'
gem 'oj', '~> 3.13', '>= 3.13.21'
gem 'pg', '~> 1.4', '>= 1.4.3'
gem 'puma', '~> 5.6', '>= 5.6.5'
gem 'rails', '~> 7.0', '>= 7.0.3.1'
gem 'redis', '~> 4.8'
gem 'shrine', '~> 3.4'
gem 'sidekiq', '~> 6.5', '>= 6.5.6'
gem 'simple_form', '~> 5.1'
gem 'vite_rails', '~> 3.0', '>= 3.0.12'

group :development, :test do
  gem 'debug', '~> 1.6', '>= 1.6.2', platforms: %i[mri mingw x64_mingw]
  gem 'js_from_routes', '~> 2.0', '>= 2.0.6'
  gem 'rspec_junit_formatter', '~> 0.5.1'
  gem 'rspec-rails', '~> 5.1', '>= 5.1.2'
  gem 'rubocop', '~> 1.35', '>= 1.35.1', require: false
  gem 'rubocop-rails', '~> 2.15', '>= 2.15.2', require: false
  gem 'rubocop-rspec', '~> 2.12', '>= 2.12.1', require: false
  gem 'solargraph', '~> 0.46.0', require: false
end

group :development do
  gem 'annotate', '~> 3.2'
  gem 'better_errors', '~> 2.9', '>= 2.9.1'
  gem 'binding_of_caller', '~> 1.0'
  gem 'brakeman', '~> 5.3', '>= 5.3.1'
  gem 'capistrano', '~> 3.17', '>= 3.17.1', require: false
  gem 'capistrano-rails', '~> 1.6', '>= 1.6.2', require: false
  gem 'capistrano-rbenv', '~> 2.2', require: false
  gem 'replicate', '~> 1.5', '>= 1.5.1', require: false
end

group :production do
  gem 'lograge', '~> 0.12.0'
end
