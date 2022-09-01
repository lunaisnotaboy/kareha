# frozen_string_literal: true

class StatusController < ApplicationController
  def plain
    query = ActiveRecord::Base.connection.execute('SELECT * FROM schema_migrations LIMIT 1')
    query = query.first

    render plain: "Kareha is running ok! (#{Time.now.utc}) (Schema version: #{query['version']})"
  end
end
