class Book < ApplicationRecord
  has_one_attached :image
  has_rich_text :overview
  has_rich_text :description
  has_drafts

  has_many :resources_tags, as: :resource, dependent: :destroy
  has_many :tags, through: :resources_tags

  validates :title, presence: true, length: { maximum: 255 }
  validates :subtitle, length: { maximum: 255 }
  validates :source_url, presence: true, uniqueness: true, format: URI::regexp(%w[http https]), length: { maximum: 2048 }
  validates :publisher, length: { maximum: 255 }

  validates :publication_year, numericality: { only_integer: true, less_than_or_equal_to: Date.today.year,  greater_than_or_equal_to: -2100 }, allow_blank: true
  validates :publication_year, presence: true, if: :publication_month?
  validates :publication_month, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 12 }, allow_blank: true
  validate :proper_publication_day
  validates :num_pages, numericality: { only_integer: true,  greater_than_or_equal_to: 0 }, allow_blank: true

  enum level: [:introductory, :intermediate, :advanced ]
  enum status: [:draft, :published ]

  private

  def proper_publication_day
    return if publication_day.blank?
    errors.add(:publication_year, "must be present") if publication_year.blank?
    errors.add(:publication_month, "must be present") if publication_month.blank?
    
    errors.add(:publication_day, "must be an integer") if publication_day != '0' and publication_day.strip.to_i == 0
    if not publication_month.blank?
      if [1, 3, 5, 7, 8, 10, 12].include? publication_month
        errors.add(:publication_day, "must be between 1 and 31") if publication_day.strip.to_i > 31 or publication_day < 1
      elsif [4, 6, 9, 11].include? publication_month
        errors.add(:publication_day, "must be between 1 and 30") if publication_day.strip.to_i > 30 or publication_day < 1
      elsif not publication_year.blank?
        if Date.leap?(publication_year.strip.to_i)
          errors.add(:publication_day, "must be between 1 and 29") if publication_day.strip.to_i > 29 or publication_day < 1
        else
          errors.add(:publication_day, "must be between 1 and 28") if publication_day.strip.to_i > 28 or publication_day < 1
        end
      end
    end
  end
end
