# frozen_string_literal: true

class Api::ReviewsController < AuthenticatedController
  def import
    ReviewsImportJob.perform_async(@shop.shopify_domain, import_params[:file_name])
  end

  private

  def import_params
    params.require(:review).permit(:file_name)
  end
end
