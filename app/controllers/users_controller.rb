class UsersController < ApplicationController
    skip_before_action :authorized, only: [:create, :reset_password_send_email, :resetpassword, :search, :confirm_email]

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
        render json: user, include: "**"
    end

    def search
        users = User.where("username LIKE ?", "%" + params[:search] + "%")
        render json: users, each_serializer: UserSearchSerializer
    end

    def destroy
        user = User.find(session[:user_id])
        user.destroy
        render json: {}
    end

    def confirm_email
        user = User.find_by(confirm_token: params[:confirm_token])
        if user
            user.confirmed = true
            user.confirm_token = nil
            user.save!(validate: false)
            render json: {message: "Please sign in to continue"}, status: :ok
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
            user.update!(user_password_params)
            if user.valid?
                render json: user, include: "**"
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

    def resetpassword
        user = User.find_by(reset_password_token: params[:password_reset_token])

        if user
            if user.password_token_sent_at + 15.minutes > Time.now.utc
                user.update!(user_password_params)
                if user.valid?
                    user.reset_password_token = nil
                    user.password_token_sent_at = nil
                    user.save!(validate: false)
                    render json: {message: "Your password has successfully been changed"}
                end
                
            else
                render json: {message: "Your token has expired. Please fill out your email to generate a new token."}, status: :unauthorized
            end
        else

            render json: {message: "fuck off buddy"}

        end
    rescue ActiveRecord::RecordInvalid => invalid
        render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
    end

    def remove_friend
        user = User.find(session[:user_id])
        friendship = user.friendships.where(friend_id: params[:id], user_id: user.id)
        if friendship.length == 0
            friendship = user.friendships.where(friend_id: user.id, user_id: params[:id])
        end
        friendship.first.destroy
        # friend = User.find(params[:id])
        
        render json: user, include: "**"
    end
    
    def add_friend
        user = User.find(session[:user_id])
        user.friendships.create(friend_id: params[:friend_id])
        render json: user, include: "**"
    end

    def confirm_friend
        friendship = Friendship.find(params[:id])
        friendship.update(status: "confirmed")
        user = User.find(session[:user_id])
        render json: user, include: "**"
    end

    private

    def user_params
        params.permit(:first_name, :last_name, :password, :password_confirmation, :birthday, :email, :username)
    end

    def user_password_params
        params.permit(:password, :password_confirmation)
    end
end
