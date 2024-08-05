# frozen_string_literal: true

required_variables = %w(
  SPACES_ACCESS_KEY_ID
  SPACES_SECRET_ACCESS_KEY
  SPACES_BUCKET
)

required_variables.each do |env_name|
  raise "Missing environment variable: #{env_name}" if ENV[env_name].blank?
end
