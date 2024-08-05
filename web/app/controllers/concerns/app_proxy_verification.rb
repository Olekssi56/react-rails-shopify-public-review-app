# frozen_string_literal: true

module AppProxyVerification
  extend ActiveSupport::Concern

  included do
    skip_before_action :verify_authenticity_token, raise: false
    before_action :verify_request
  end

  private

  def verify_request
    query_parameters = Rack::Utils.parse_query(request.query_string)
    head(401) unless hmac_valid?(query_parameters)
  end

  def hmac_valid?(query_parameters)
    signature = query_parameters.delete('signature')
    sorted_params = query_parameters.collect { |k, v| "#{k}=#{Array(v).join(',')}" }.sort.join

    ActiveSupport::SecurityUtils.secure_compare(
      signature,
      OpenSSL::HMAC.hexdigest(OpenSSL::Digest::Digest.new('sha256'), ENV.fetch('SHOPIFY_API_SECRET', nil), sorted_params)
    )
  end
end
