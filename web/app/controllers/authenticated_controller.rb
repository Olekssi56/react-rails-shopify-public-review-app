# frozen_string_literal: true

class AuthenticatedController < ApplicationController
  include ShopifyApp::EnsureHasSession

  before_action :set_shop

  # rubocop:disable Naming/MemoizedInstanceVariableName
  def set_shop
    @shop ||= Shop.find_by(shopify_domain: current_shopify_domain)
  end
  # rubocop:enable Naming/MemoizedInstanceVariableName
end
