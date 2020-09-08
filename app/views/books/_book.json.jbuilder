json.extract! book, :id, :title, :source_url, :publication_year, :publication_month, :publication_day, :publisher, :overview, :description, :num_pages, :level, :created_at, :updated_at
json.url book_url(book, format: :json)
