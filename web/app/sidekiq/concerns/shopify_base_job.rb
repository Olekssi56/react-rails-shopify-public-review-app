# frozen_string_literal: true

require 'sidekiq/api'

Sidekiq::Job.extend ActiveSupport::Concern

module ShopifyBaseJob
  extend ActiveSupport::Concern

  include Sidekiq::Job

  included do
    def find_shop(shop_domain)
      shop = Shop.find_by(shopify_domain: shop_domain)

      if shop.nil?
        logger.error("#{self.class} failed: cannot find shop with domain '#{shop_domain}'")
        raise ActiveRecord::RecordNotFound, 'Shop Not Found'
      end

      shop
    end

    def find_subscription(app_subscription_id)
      subscription = @shop.subscriptions.find_by(shopify_id: app_subscription_id)

      if subscription.nil?
        logger.error("#{self.class} failed: cannot find subscription '#{app_subscription_id}'")

        raise ActiveRecord::RecordNotFound, 'Subscription Not Found'
      end

      subscription
    end
  end
end
