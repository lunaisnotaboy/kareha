# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  avatar_data            :jsonb
#  confirmation_sent_at   :datetime
#  confirmation_token     :string
#  confirmed_at           :datetime
#  current_sign_in_at     :datetime
#  current_sign_in_ip     :string
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  last_sign_in_at        :datetime
#  last_sign_in_ip        :string
#  nickname               :string
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  role                   :integer
#  sign_in_count          :integer          default(0), not null
#  unconfirmed_email      :string
#  username               :string           default(""), not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_confirmation_token    (confirmation_token) UNIQUE
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#  index_users_on_username              (username) UNIQUE
#
class User < ApplicationRecord
  include AvatarUploader::Attachment(:avatar)

  # List of reserved usernames. If you add a new path in the
  # root namespace, add it here
  DISALLOWED_USERNAMES = %w[
    404.html
    422.html
    500.html
    about
    api
    apple-touch-icon-precomposed.png
    apple-touch-icon.png
    assets
    assets-dev
    assets-test
    docs
    favicon.ico
    robots.txt
    sidekiq
    status
    uploads
    users
  ].freeze

  after_initialize :set_default_role, if: :new_record?

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :confirmable, :trackable

  enum role: { user: 0, mod: 1, admin: 2 }

  validates :username, exclusion: { in: DISALLOWED_USERNAMES }, presence: true, uniqueness: true

  protected

  # Set the role on creation. If a role was defined, we will
  # use that. If not, we will set the new user to the default
  # role.
  def set_default_role
    self.role ||= :user
  end
end
