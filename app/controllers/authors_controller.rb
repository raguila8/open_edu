class AuthorsController < ApplicationController
  before_action :force_json, only: :index

  def index
    @authors = Author.basic_search(params[:q]).limit(12) 
  end

  private

  def force_json
    request.format = :json
  end
end
