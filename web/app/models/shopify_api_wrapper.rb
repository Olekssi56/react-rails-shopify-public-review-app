# frozen_string_literal: true

module ShopifyApiWrapper
  class Shop
    attr_reader :client

    def initialize(session:)
      @client = ShopifyAPI::Clients::Rest::Admin.new(session: session)
    end

    def retrieve
      response = client.get(path: 'shop')
      data = response.body['shop']

      fields_to_extract = %w(
        name
        currency
        customer_email
        email
        shop_owner
        address1
        address2
        city
        province_code
        zip
        country_code
        phone
      )

      extracted_fields = data.slice(*fields_to_extract)
      extracted_fields.transform_keys(&:to_sym)

      extracted_fields.merge(
        shopify_id: data['id'],
        timezone: ActiveSupport::TimeZone::MAPPING.key(data['iana_timezone']),
        shopify_plan_name: data['plan_name'],
      )
    end

    class << self
      def retrieve(session:)
        new(session: session)
          .retrieve
      end
    end
  end
end
