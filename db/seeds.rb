# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require 'uri'
require 'net/http'
require 'openssl'
require 'json'

def api_data 
    url = URI("https://jonahtaylor-national-park-service-v1.p.rapidapi.com/parks?limit=50")

    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE

    request = Net::HTTP::Get.new(url)
    request["X-Api-Key"] = '9nzLdIEabRYheVamhU9emwHWyYsShAp7PkFigs9r'
    request["X-RapidAPI-Key"] = '03cbacb2d6msh147d7e91d53a89fp189018jsn4c2e0d1cd811'
    request["X-RapidAPI-Host"] = 'jonahtaylor-national-park-service-v1.p.rapidapi.com'

    response = http.request(request)
    data = JSON.parse(response.read_body)["data"]
end
data = api_data

data.each do |park|
    a = park["addresses"][0]
    a["type"] = ''
    adress = a.reduce('') {|memo, (key, val)| memo + " " +val}
   p = Park.create(
     api_id: park["id"],
     name:  park["name"],
     full_name: park["fullName"],
     park_code: park["parkCode"],
     description: park["description"],
     states: park["states"],
     directions_info: park["directionsInfo"],
    #  operating_hours: park["operatingHours"][0]["description"],
     address:  adress,
     weather_info: park["weatherInfo"],
     designation: park["designation"],
     url: park["url"] 
  )
  park["images"].each do |image|
     Image.create(
         title:  image["title"],
         alt_text: image["altText"],
         caption: image["caption"],
        url: image["url"],
        park_id: p.id
     )
  end
end

puts "done"
# puts obj["data"][0].keys
# puts obj["data"][0]["images"][1]
#  puts Park.last
#  puts Image.all