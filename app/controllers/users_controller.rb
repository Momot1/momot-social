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

    def changepassword
        user = User.find(session[:user_id])
        if(user&.authenticate(params[:old_password]))
            user.update!(user_update_params)
            if user.valid?
                render json: user
            end
        else
            user.errors.add(:base, "Incorrect old password")
            if(params[:password_confirmation] != params[:password])
                user.errors.add(:base, "Password confirmation doesn't match Password")
            end

            render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
        end
    rescue ActiveRecord::RecordInvalid => invalid
        render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
    end

    private

    def user_params
        params.permit(:first_name, :last_name, :password, :password_confirmation, :birthday, :email, :username)
    end

    def user_update_params
        params.permit(:password, :password_confirmation)
    end
end
