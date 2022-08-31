# frozen_string_literal: true

class AddAvatarDataToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :avatar_data, :jsonb
  end
end
