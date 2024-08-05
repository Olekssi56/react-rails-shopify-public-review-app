# frozen_string_literal: true

class AppRecurringPricingFields
  FRAGMENT = <<~GRAPHQL
    fragment AppRecurringPricingFields on AppRecurringPricing {
      price {
        amount
      }
      interval
    }
  GRAPHQL
end
