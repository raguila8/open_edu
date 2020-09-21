class ResourcesTag < ApplicationRecord
  belongs_to :tag
  belongs_to :resources, polymorphic: true
end
