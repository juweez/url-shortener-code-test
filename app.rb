require 'sinatra'
require 'json'
require_relative './url_shortener'

get '/' do
  erb :index
end

post '/' do
  original_url = params[:url]
  short_url_id = UrlShortener.new(original_url).generate
  short_url = "#{request.base_url}/#{short_url_id}"

  if short_url
    content_type :json
    { short_url: short_url, original_url: original_url }.to_json
  else
    status 422
    content_type :json
    { errors: "Could not shorten the given url" }
  end
end
