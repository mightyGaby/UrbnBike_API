class BikeracksController < ApplicationController

  after_filter :cors_set_access_control_headers

  def cors_set_access_control_headers
    headers['Access-Control-Allow-Origin'] = '*'
  end

  def index
    @bikeracks = Bikerack.all
  end

  def create
    bikerack = Bikerack.new(bikerack_params)
    bikerack.save!
    render json: @bikerack
  end

  def destroy
    Bikerack.destroy(params[:id])
  end

  def api
    @bikeracks = Bikerack.all
    render json: @bikeracks
  end

  def markers
    @bikeracks = Bikerack.all
    @geojson = Array.new

    @bikeracks.each do |bikerack|
      @geojson << {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [bikerack.lng, bikerack.lat]
        },
        properties: {
          title: bikerack.neighborhood,
          description: bikerack.address + '</br><div class="marker-info"></div>',
          :'marker-color' => '#00607d',
          :'marker-symbol' => 'bicycle',
          :'marker-size' => 'large',
          :className => "marker"
        }
      }
    end
    render json: @geojson
  end

  def bikerack_params
      params.require(:bikerack).permit(:address, :neighborhood, :lat, :lng, :location, :comment_id, :warning_id)
  end

end
