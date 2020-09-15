json.resources do
  json.array!(@authors) do |author|
    json.name author.name
    json.about author.about
    json.avatar avatar_path(author)
  end
end
