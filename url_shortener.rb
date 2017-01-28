class UrlShortener
  def initialize(url)
    @url = url
  end

  def generate
    return false if url.empty?

    random_string
  end

  private

  attr_reader :url

  def random_string
    rand(((36**6)+1)..(36**7)).to_s(36)
 end
end
