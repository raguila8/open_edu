json.resources do
  json.array!(@authors) do |author|
    json.name author.name
    json.avatar avatar_path(author)
    json.value author.id
  end
end
