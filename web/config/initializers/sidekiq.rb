# frozen_string_literal: true

REDIS_CONFIG = {
  url: ENV['REDIS_URL'] || 'redis://127.0.0.1:6379',
  ssl_params: {
    verify_mode: OpenSSL::SSL::VERIFY_NONE,
  },
  network_timeout: 5,
}.freeze

Sidekiq.configure_server do |config|
  config.redis = REDIS_CONFIG
end

Sidekiq.configure_client do |config|
  config.redis = REDIS_CONFIG
end
