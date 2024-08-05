# frozen_string_literal: true

if @active_subscription.present?
  json.subscription do
    json.partial! @active_subscription, as: :subscription, expose_plan: true
  end
end

json.plans @plans, partial: 'api/plans/plan', as: :plan

json.extract! @shop, :shop_owner, :customer_email
