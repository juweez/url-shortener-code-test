require 'sinatra'
require 'json'
require_relative './url_shortener'

class Cache
  @@shortened_urls = {}

  def self.init()
    @@shortened_urls = {}
  end

  def self.add(short_url_id, original_url)
    @@shortened_urls[short_url_id] = original_url
  end

  def self.urls()
    return @@shortened_urls
  end
end

configure do
  Cache::init
end

get '/' do
  erb :index
end

get '/:id' do
  if Cache::urls.key?(params['id'])
    redirect_url = Cache::urls[params['id']]

    unless redirect_url.start_with?('http')
      redirect_url = "http://#{redirect_url}"
    end

    redirect(redirect_url)
  else
    redirect(request.base_url)
  end
end

post '/' do
  original_url = params[:url]
  short_url_id = UrlShortener.new(original_url).generate
  short_url = "#{request.base_url}/#{short_url_id}"

  if short_url
    Cache::add(short_url_id, original_url)

    content_type :json
    { short_url: short_url, original_url: original_url }.to_json
  else
    status 422
    content_type :json
    { errors: "Could not shorten the given url" }
  end
end
