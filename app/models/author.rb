class Author < ApplicationRecord
  has_one_attached :avatar
  validate :avatar_format

  validates :name, presence: true
  validates :website_url, format: URI::regexp(%w[http https]), allow_blank: true

  private

  def avatar_format
    return unless avatar.attached?
    if avatar.blob.content_type.start_with? 'image/'
      if avatar.blob.byte_size > 15.megabytes
        errors.add(:avatar, 'size needs to be less than 15MB')
        avatar = nil
      end
    else
      avatar = nil
      errors.add(:avatar, 'needs to be an image')
    end
  end
end
