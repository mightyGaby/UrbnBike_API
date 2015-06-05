class WarningsController < ApplicationController

  def create
    warning = Warning.new(warning_params)
    warning.save!
    render json: warning
  end


  def warning_params
      params.require(:warning).permit(:date_added, :warning_type)
  end

end
