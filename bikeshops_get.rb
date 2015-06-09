require 'yelp'
puts "get yelp data? y/n"
run = gets.chomp
if run == 'y'
  # client = Yelp::Client.new({consumer_key: ENV['consumer_key'],
  #                             consumer_secret: ENV['consumer_secret'] ,
  #                             token: ENV['token'],
  #                             token_secret: ENV['token_secret']
  #                             })

  client = Yelp::Client.new({consumer_key: '6etseIfxHfqQGSIL7cQaKw',
                            consumer_secret: 'r2G7ENgxs5o4Z5XK__Hm45hsO8E',
                            token: 'orbnErVdbQiTFsDn-NjTQsAv1tx4Hec2',
                            token_secret: 'zFo1S8j0iCCm0RgzgLMpWhkdKwA'
                            })

    #creates an empty hash to store data as json
    business_info = Hash.new{ |hash, key| hash[key] = {} }

    #accept users' search term
    location = 'Chicago'
    term = 'Bike'

    client.search(location, term:term).businesses.each do |business|
      business_info[business.name] = {
        :name => business.name,
        :address => business.location,
        :rating => business.rating,
        :url => business.url
      }
    end

    business_info = business_info.to_json

    File.write("db/bike_shops.json", business_info)
    puts "data saved successfully!"
  else
    puts "no new data"
end
