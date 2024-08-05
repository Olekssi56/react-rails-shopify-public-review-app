# frozen_string_literal: true

json.id subscription.id
json.name subscription.name
json.current_period_end subscription.current_period_end
json.status subscription.status
json.test subscription.test
json.trial_days subscription.trial_days
json.app_usage_capped_amount subscription.app_usage_capped_amount
json.app_usage_balanced_used subscription.app_usage_balanced_used

if expose_plan
  json.plan do
    json.partial! subscription.plan, as: :plan
  end
end
