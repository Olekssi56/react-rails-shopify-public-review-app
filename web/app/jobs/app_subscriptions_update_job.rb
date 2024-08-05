# frozen_string_literal: true

class AppSubscriptionsUpdateJob < ApplicationJob
  extend ShopifyAPI::Webhooks::Handler

  class << self
    def handle(topic:, shop:, body:)
      perform_later(topic: topic, shop_domain: shop, webhook: body)
    end
  end

  def perform(topic:, shop_domain:, webhook:)
    Shopify::AppSubscriptionsUpdateJob.perform_async(shop_domain, webhook['app_subscription']['admin_graphql_api_id'])
  end
end
