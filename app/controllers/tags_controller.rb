class TagsController < ApplicationController
  before_action :force_json, only: :index

  def index
    #@tags = Tag.basic_search(params[:q]).limit(12)
    @tags = Tag.where("lower(name) LIKE ?", "%#{params[:q]}%")
  end

  private

  def force_json
    request.format = :json
  end
end
