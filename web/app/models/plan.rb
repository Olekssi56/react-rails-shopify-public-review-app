# frozen_string_literal: true

class Plan < ApplicationRecord
  has_many :subscriptions, dependent: :destroy
  has_many :features, class_name: 'PlanFeature', dependent: :destroy
  has_many :active_features, -> { where(active: true) }, class_name: 'PlanFeature', dependent: :destroy

  scope :ordered_by_display_index, -> { order(display_index: :asc) }

  def free?
    price.zero?
  end
end
