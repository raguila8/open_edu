class Tag < ApplicationRecord
  before_validation { self.name = name.downcase if not name.blank? }
  before_validation { self.display_name = name.downcase.titleize if not name.blank? and display_name.blank? }

  has_many :resources_tags, dependent: :destroy
  has_many :books, through: :resources_tags, source: :resource, source_type: 'Book'
  
  validates :name, presence: true, uniqueness: { case_sensitive: false }, length: { maximum: 25 }
  validates_format_of :name, :with => /\A[A-Za-z\d\s\-\+]*\z/,
    :message => "can only support letters, numbers, spaces, and dashes."

  validates :display_name, presence: true, uniqueness: { case_sensitive: false }, length: { maximum: 25 }
end
