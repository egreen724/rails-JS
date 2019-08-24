class TripsController < ApplicationController

  def new
    if params[:activity_id]
      @trip = Trip.new(activity_id: params[:activity_id] )
      @current_user = current_user
    else
      @trip = Trip.new
      @current_user = current_user
    end
  end

  def create
    @trip = Trip.new(trip_params)

    if @trip.save
      # redirect_to ("/trips/#{@trip.id}")
       render json: @trip
    else #use errors hash instead of flash and render page
      flash[:notice] = "Please complete the form with valid entries."
      redirect_to(controller: 'trips', action: 'new')
    end
  end

  def index
    if params[:activity_id]
      @activity = Activity.find_by(id: params[:activity_id])
      @trips = @activity.trips
    else
      @trips = Trip.all
    end
  end

  def show
    @trip = Trip.find_by(id: params[:id])
    @current_user = current_user
  end

  def edit
    @trip = Trip.find(params[:id])
    @current_user = current_user
  end

  def update
    @trip = Trip.find(params[:id])
    @trip.update(trip_params)
    redirect_to ("/trips/#{@trip.id}")
  end

  def destroy
    @trip = Trip.find(params[:id])
    @trip.delete

    redirect_to user_path(current_user)
  end

  def trip_params
    params.require(:trip).permit(
      :activity_id,
      :user_id,
      :date,
      :time_ellapsed,
      :comment,
      :taken
    )
  end

end
