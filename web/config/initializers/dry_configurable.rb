# frozen_string_literal: true

PassionfruitReviews.configure do |config|
  config.test_mode = ENV.fetch('TEST_MODE', 'false') == 'true'
  config.spaces.access_key_id = ENV.fetch('SPACES_ACCESS_KEY_ID', '')
  config.spaces.secret_access_key = ENV.fetch('SPACES_SECRET_ACCESS_KEY', '')
  config.spaces.bucket = ENV.fetch('SPACES_BUCKET', '')
end
