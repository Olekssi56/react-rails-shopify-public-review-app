# frozen_string_literal: true

json.id plan.id
json.name plan.name
json.description plan.description
json.note plan.note
json.price plan.price.zero? ? '0' : '%.2f' % plan.price
json.recommended plan.recommended
json.discount plan.discount
json.currency plan.currency
json.interval plan.interval
json.trial_days plan.trial_days
json.recommended plan.recommended
json.active plan.active
json.active_features []
json.app_usage_price plan.app_usage_price
json.app_usage_terms plan.app_usage_terms
json.app_usage_capped_amount plan.app_usage_capped_amount
