# frozen_string_literal: true

class AddColumnsToShops < ActiveRecord::Migration[7.1]
  def change
    safety_assured do
      change_table(:shops, bulk: true) do |t|
        t.bigint(:shopify_id)
        t.string(:name)
        t.string(:currency)
        t.string(:timezone)
        t.string(:customer_email)
        t.string(:email)
        t.string(:shopify_plan_name)
        t.string(:shop_owner)
        t.string(:address1)
        t.string(:address2)
        t.string(:city)
        t.string(:province_code)
        t.string(:zip)
        t.string(:country_code)
        t.string(:phone)
      end
    end
  end
end
