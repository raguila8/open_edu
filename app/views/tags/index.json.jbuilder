json.resources do
  json.array!(@tags) do |tag|
    json.name tag.name
    json.value tag.id
  end
end
