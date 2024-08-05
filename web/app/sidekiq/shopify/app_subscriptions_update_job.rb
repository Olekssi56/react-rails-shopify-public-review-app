# frozen_string_literal: true

class Shopify::AppSubscriptionsUpdateJob
  include ShopifyBaseJob

  sidekiq_options queue: :default, retry: 2

  def perform(shop_domain, shopify_app_subscription_gid)
    @shop = find_shop(shop_domain)
    app_subscription_id = shopify_app_subscription_gid.gsub('gid://shopify/AppSubscription/', '')
    @subscription = find_subscription(app_subscription_id)

    @shop.with_shopify_session do
      shopify_subscription = retrieve_shopify_subscription(shopify_app_subscription_gid)
      update_subscription!(shopify_subscription)
      return if shopify_subscription.status != 'ACTIVE'
    end
  end

  private

  def retrieve_shopify_subscription(shopify_app_subscription_gid)
    response = GetAppSubscription.call(gid: shopify_app_subscription_gid)
    response.data.subscription
  end

  def update_subscription!(shopify_subscription)
    @subscription.update!(
      status: shopify_subscription.status,
      trial_days: shopify_subscription.trial_days,
      current_period_end: shopify_subscription.current_period_end,
      app_usage_capped_amount: shopify_subscription.usage_capped_amount
    )
  end
end
