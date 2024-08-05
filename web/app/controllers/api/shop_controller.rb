# frozen_string_literal: true

class Api::ShopController < AuthenticatedController
  def index
    @active_subscription = @shop.active_subscription
    @plans = Plan.ordered_by_display_index
  end
end
