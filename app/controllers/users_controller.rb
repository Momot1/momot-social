class UsersController < ApplicationController
    def create
        user = User.create(user_params)
        if user.valid?
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
        end
        
    end

    def show
        user = User.find(session[:user_id])
        render json: user
    end

    private

    def user_params
        params.permit(:first_name, :last_name, :password, :password_confirmation, :birthday, :email.downcase.gsub(/\s+/, ""), :username.downcase.gsub(/\s+/, ""))
    end
end
