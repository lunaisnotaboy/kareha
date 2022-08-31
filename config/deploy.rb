# frozen_string_literal: true

lock '~> 3.17.1'

set :application, 'kareha'
set :repo_url, 'git@github.com:lunaisnotaboy/kareha.git'
set :deploy_to, '/opt/kareha'
set :format, :airbrussh
set :format_options, command_output: true, log_file: 'log/capistrano.log', color: :auto, truncate: :auto
append :linked_dirs, 'log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'tmp/webpacker', 'public/system', 'vendor', 'storage'
set :keep_releases, 5
