class SessionsController < ApplicationController
    skip_before_action :authorized, only: [:create]
    def create   
        user = User.find_by(username: params[:username].downcase.gsub(/\s+/, ""))

        if !user
            user = User.find_by(email: params[:username].downcase.gsub(/\s+/, ""))
        end

        if user&.authenticate(params[:password])
            if user.confirmed
                session[:user_id] = user.id
                render json: user
            else
                render json: {error: "Please confirm your email address to continue"}, status: :unauthorized
            end
            
        else
            render json: {error: "Invalid username/password"}, status: :unauthorized
        end 
    end

    def destroy
        session.delete(:user_id)
        render json: nil
    end
end
