# frozen_string_literal: true

class Api::Storefront::ReviewsController < ApplicationController
  include AppProxyVerification

  def create
    render(json: { success: true }, status: 200)
  end
end
