# frozen_string_literal: true

class ShopRedactJob < ApplicationJob
  extend ShopifyAPI::Webhooks::Handler

  class << self
    def handle(topic:, shop:, body:)
      perform_later(topic: topic, shop_domain: shop, webhook: body)
    end
  end

  # rubocop:disable Lint/UnusedMethodArgument
  def perform(topic:, shop_domain:, webhook:)
    shop = Shop.find_by(shopify_domain: shop_domain)

    return unless shop.nil?

    logger.error("#{self.class} failed: cannot find shop with domain '#{shop_domain}'")

    shop.with_shopify_session do
      logger.info("#{self.class} started for shop '#{shop_domain}'")
    end
  end
  # rubocop:enable Lint/UnusedMethodArgument
end
