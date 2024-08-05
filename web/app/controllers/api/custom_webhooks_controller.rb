# frozen_string_literal: true

class Api::CustomWebhooksController < ApplicationController
  include ShopifyApp::WebhookVerification

  # We return early to Shopify a 200 because if we return with anything else or
  # take more than 2 seconds to respond, Shopify considers it a failure and will
  # retry a few times before they *disable* the webhook subscription permanently
  def receive
    params.permit!

    head(200)

    process_shopify_webhook
  end

  private

  # If anything reads the body before we do we can be at the last byte of it, so
  # when we do `request.body.read` again we won't read the actual body.
  # If we rewind it and then read it, we are guaranteed to not miss any data.
  def request_body
    @request_body ||= begin
      request.body.rewind
      request.body.read
    end
  end

  def shopify_webhook_headers
    request
      .headers
      .select do |h, _k|
        header = h.to_s.downcase
        header.include?('http') || header.include?('shopify')
      end
      .to_h
  end

  def process_shopify_webhook
    ShopifyAPI::Webhooks::Registry.process(
      ShopifyAPI::Webhooks::Request.new(
        raw_body: request.raw_post,
        headers: shopify_webhook_headers
      )
    )
  end
end
