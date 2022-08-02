class LikesController < ApplicationController
    def create
        user = User.find(session[:user_id])
        user.likes.create(post_id: params[:post_id])
        render json: user, include: "**"
    end

    def destroy
        like = Like.find(params[:id])
        like.destroy
        user = User.find(session[:user_id])
        render json: user, include: "**"
    end
end
