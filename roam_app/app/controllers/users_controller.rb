class UsersController < ApplicationController
  skip_before_action :verify_user_is_authenticated, only: [:new, :create, :home]

  def home
    @current_user = current_user
  end

  def new

  end

  def index
    @users = User.all
    respond_to do |f|
      f.html
      f.json {render json: @users}
    end
  end

  def create
    @user = User.new(user_params)

    if User.find_by(email: params[:user][:email])
      flash[:notice] = "This email address is already in the Roam system. Please log in."
    elsif @user.save && params[:user][:password] == params[:user][:password_confirmation]
        session[:user_id] = @user.id
        redirect_to ("/users/#{@user.id}")
    else
      flash[:notice] = "Please complete the form with valid entries."
      redirect_to(controller: 'users', action: 'new')
    end
  end

  def show
    @user = User.find(params[:id])
    @current_user = current_user

    respond_to do |f|
      f.html
      f.json {render json: @user}
    end

    if @user.trips != []
      if @user.sorted_by_date.last.taken == true
        @recent_trip = @user.sorted_by_date.last
      end
    end
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    #check if email already exists in the database?
    @user.update(name: params[:user][:name], email: params[:user][:email], age: params[:user][:age], bio: params[:user][:bio])
    redirect_to user_path(@user)
  end

   def user_params
     params.require(:user).permit(:name, :email, :bio, :age, :password, :password_confirmation)
   end
end
