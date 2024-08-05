# frozen_string_literal: true

class AppUsagePricingFields
  FRAGMENT = <<~GRAPHQL
    fragment AppUsagePricingFields on AppUsagePricing {
      balanceUsed {
        amount
      }
      cappedAmount {
        amount
      }
      interval
      terms
    }
  GRAPHQL
end
