class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :masqueradable, :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable

  has_one_attached :avatar
  #  has_many :services

  validate :avatar_format

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
