# frozen_string_literal: true

class Subscription < ApplicationRecord
  belongs_to :shop
  belongs_to :plan
end
