# frozen_string_literal: true

class CreatePlanFeatures < ActiveRecord::Migration[7.1]
  def change
    create_table :plan_features do |t|
      t.belongs_to(:plan, foreign_key: true, index: true, null: false)

      t.string(:name, null: false)
      t.string(:description, null: false)
      t.boolean(:active, default: false, null: false)

      t.timestamps
    end
  end
end
