# frozen_string_literal: true

class ReviewsImportJob
  include ShopifyBaseJob

  sidekiq_options queue: :default, retry: 2

  def perform(shop_domain, file_name)
    @shop = find_shop(shop_domain)

    parse_file(@shop, file_name)
  end

  private

  def read_file(file_name)
    client = Aws::S3::Client.new(
      access_key_id: PassionfruitReviews.config.spaces.access_key_id,
      secret_access_key: PassionfruitReviews.config.spaces.secret_access_key,
      endpoint: 'https://nyc3.digitaloceanspaces.com',
      force_path_style: true,
      region: 'nyc3'
    )

    bucket = PassionfruitReviews.config.spaces.bucket
    resp = client.get_object(bucket: bucket, key: file_name)
    resp.body.read
  end

  def parse_file(shop, file_name)
    csv_content = read_file(file_name)

    Tempfile.open(['temp', '.csv']) do |f|
      f.write(csv_content)
      f.rewind

      begin
        SmarterCSV.process(f.path, { chunk_size: 100 }) do |chunk|
          chunk.each do |review|
            # process review
          end
        end
      rescue OpenURI::HTTPError => e
        Sidekiq.logger.info "HTTP Error: #{e}"
      rescue Errno::ENOENT => e
        Sidekiq.logger.info "File not found: #{e}"
      rescue => e
        Sidekiq.logger.info e.message
      end
    end

    send_email(shop)
  end

  def send_email(shop)
  end
end
