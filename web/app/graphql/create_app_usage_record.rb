# frozen_string_literal: true

class CreateAppUsageRecord
  include ShopifyGraphql::Query

  MUTATION = <<~GRAPHQL.freeze
    #{AppUsagePricingFields::FRAGMENT}

    mutation appUsageRecordCreate(
      $description: String!
      $price: MoneyInput!
      $subscriptionLineItemId: ID!
    ) {
      appUsageRecordCreate(
        description: $description
        price: $price
        subscriptionLineItemId: $subscriptionLineItemId
      ) {
        userErrors {
          field
          message
        }
        appUsageRecord {
          id
          subscriptionLineItem {
            plan {
              pricingDetails {
                ... AppUsagePricingFields
              }
            }
          }
        }
      }
    }
  GRAPHQL

  def call(
    subscription_line_item_id:,
    app_usage_price:,
    description:
  )
    payload = {
      subscriptionLineItemId: subscription_line_item_id,
      price: {
        amount: app_usage_price,
        currencyCode: 'USD',
      },
      description: description,
    }

    response = execute(MUTATION, **payload)
    response.data = response.data.appUsageRecordCreate
    handle_user_errors(response.data)
    response.data = parse_data(response.data)
    response
  end

  private

  def parse_data(data)
    Struct
      .new(
        :app_usage_record_id,
        :app_usage_record_gid,
        :app_usage_balanced_used
      )
      .new(
        data.appUsageRecord.id.gsub('gid://shopify/AppUsageRecord/', ''),
        data.appUsageRecord.id,
        data.appUsageRecord.subscriptionLineItem.plan.pricingDetails.balanceUsed.amount
      )
  end
end
