# frozen_string_literal: true

class Api::SubscriptionsController < AuthenticatedController
  before_action :validate_plan!, only: [:create]

  def create
    app_usage = {}

    if @plan.app_usage_price.present?
      app_usage = {
        terms: @plan.app_usage_terms,
        capped_amount: @plan.app_usage_capped_amount,
      }
    end

    @shop.subscriptions.update(status: 'INACTIVE')

    if @plan.free?
      create_free_subscription!

      render json: {}
    else
      response = create_shopify_app_subscription(app_usage)
      create_subscription!(response.data.subscription)

      render json: { confirmation_url: response.data.confirmation_url }
    end
  end

  private

  def validate_plan!
    @plan = Plan.find(params[:plan_id])

    return unless @plan.nil?

    render json: { success: false }, status: 400
  end

  def create_shopify_app_subscription(app_usage)
    CreateAppSubscription.call(
      name: "#{@plan.name} Plan",
      price: @plan.price,
      return_url: @shop.return_url,
      trial_days: @plan.trial_days,
      test: PassionfruitReviews.config.test_mode,
      interval: @plan.interval,
      app_usage: app_usage
    )
  end

  def create_free_subscription!
    current_time = Time.current

    @shop.subscriptions.create!(
      plan: @plan,
      shopify_id: nil,
      name: @plan.name,
      current_period_end: current_time + 30.days,
      status: 'ACTIVE',
      test: PassionfruitReviews.config.test_mode,
      trial_days: @plan.trial_days,
      created_at: current_time
    )
  end

  def create_subscription!(shopify_subscription)
    @shop.subscriptions.create!(
      plan: @plan,
      shopify_id: shopify_subscription.id,
      name: shopify_subscription.name,
      current_period_end: shopify_subscription.current_period_end,
      status: shopify_subscription.status,
      test: shopify_subscription.test,
      trial_days: shopify_subscription.trial_days,
      created_at: shopify_subscription.created_at,
      app_usage_line_item_id: shopify_subscription.usage_line_item_id,
      app_usage_capped_amount: shopify_subscription.usage_capped_amount,
      app_usage_balanced_used: shopify_subscription.usage_balance_used
    )
  end
end
