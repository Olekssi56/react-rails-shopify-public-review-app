# frozen_string_literal: true

class Shop < ApplicationRecord
  include ShopifyApp::ShopSessionStorageWithScopes

  has_many :subscriptions, dependent: :destroy
  has_one :active_subscription, -> { where(status: 'ACTIVE') }, class_name: 'Subscription', inverse_of: :shop, dependent: :destroy
  delegate :plan, to: :active_subscription, allow_nil: true

  def api_version
    ShopifyApp.configuration.api_version
  end

  def return_url
    shop = shopify_domain
    host = Base64.encode64("#{shop}/admin")
    "#{ShopifyAPI::Context.host}?shop=#{shop}&host=#{host}"
  end
end
