# frozen_string_literal: true

class GetAppSubscription
  include ShopifyGraphql::Query

  QUERY = <<~GRAPHQL.freeze
    #{AppSubscriptionFields::FRAGMENT}

    query($id: ID!) {
      node(id: $id) {
        ... AppSubscriptionFields
      }
    }
  GRAPHQL

  def call(gid:)
    response = execute(QUERY, id: gid)
    response.data = parse_data(response.data)
    response
  end

  private

  def parse_data(data)
    raise ShopifyGraphql::ResourceNotFound.new(200, 'Subscription not found') if data.node.nil?

    Struct
      .new(
        :subscription
      )
      .new(
        AppSubscriptionFields.parse(data.node)
      )
  end
end
