class UsersController < ApplicationController
    skip_before_action :authorized, only: [:create, :confirm_email, :reset_password_send_email]

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
        user = User.find_by(confirm_token: params[:confirm_token])
        if user
            user.confirmed = true
            user.confirm_token = nil
            user.save!(validate: false)
            render json: {message: "Please sign in to continue"}
        else
            render json: {error: "That user does not exist"}, status: :unauthorized
        end
    end

    def reset_password_send_email
        @user = User.find_by(email: params[:email])
        if @user
            @user.generate_password_reset_token
            UserMailer.reset_password(@user).deliver
        end
        render json: {message: "A password reset link has been sent to #{params[:email]}."}
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
