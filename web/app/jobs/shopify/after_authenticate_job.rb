# frozen_string_literal: true

module Shopify
  class AfterAuthenticateJob < ApplicationJob
    def perform(shop_domain:)
      shop = Shop.find_by(shopify_domain: shop_domain)

      return if shop.name.present?

      shop.with_shopify_session do |session|
        shop_data = ShopifyApiWrapper::Shop.retrieve(session: session)
        shop.update!(shop_data)
      end
    end
  end
end
