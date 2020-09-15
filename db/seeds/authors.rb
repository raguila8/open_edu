require 'csv'
require 'open-uri'
require 'resolv-replace'

authors_csv = CSV.read("db/data/authors.csv", headers: true)
authors_csv.each do |author|
  if not Author.exists?(name: author.field('name'))
    new_author = Author.create(name: author.field('name'), about: author.field('about'), twitter_username: author.field('twitter_username'), website_url: author.field('personal_website'))

    if not author.field('avatar').nil?
      begin
        retries ||= 0
        avatar_image = open(author.field('avatar'))
        new_author.avatar.attach(io: avatar_image  , filename: new_author.name.downcase.gsub(' ', '_'))
      rescue Net::OpenTimeout
        retries += 1
        puts "Rescued from Net::OpenTimeout for author with name: #{new_author.name}. Retrying for the #{retries.ordinalize} time..."
        retry
      end
    end

    retries = 0
    puts "Created new author with name: #{new_author.name}"
  end
end
