require 'open-uri'

google = open('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.7053,-74.0140&radius=500&type=overall&keyword=restroom&key=AIzaSyB-QdrzvR2sNlHBYZQjLe59ADkfmjQ3oRY')
response_status = google.status
response_body = google.read

puts response_status
puts response_body
