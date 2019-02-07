class Api::TagsController < ApplicationController
  def index
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
