class Api::TagsController < ApplicationController
  # skip_before_action :verify_authenticity_token
def show
  tags = Tag.all

  render json: {
    tags: tags.map do |tag|
      {
        id: tag.id,
        name: tag.name
      }
    end
  }
end

end
