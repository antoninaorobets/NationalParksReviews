require 'uri'
require 'net/http'
require 'openssl'
require 'json'

def api_data 
    url = URI("https://jonahtaylor-national-park-service-v1.p.rapidapi.com/parks?limit=2")

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
