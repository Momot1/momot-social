class UsersController < ApplicationController
    skip_before_action :authorized, only: [:create]

    def create
        @user = User.create(user_params)
        if @user.save
            UserMailer.registration_confirmation(@user).deliver
            render json: {message: "Please confirm your email address to continue"}, status: :created
        else
            render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
        end
        
    end

    def show
        user = User.find(session[:user_id])
        render json: user
    end

    def confirm_email
        user = User.find_by_confirm_token(params[:id])
        if user
            user.update(confirmed: true, confirm_token: nil)
            render json: {message: "Please sign in to continue"}
        else
            render json: {error: "That user does not exist"}
        end
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
