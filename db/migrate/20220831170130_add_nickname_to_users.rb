# frozen_string_literal: true

class AddNicknameToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :nickname, :string, null: true
  end
end