class PostsController < ApplicationController
    skip_before_action :authorized, only: [:index]
    def index
        render json: Post.all
    end

    def show
        post = Post.find(params[:id])
        render json: post
    end

    def create
        user = User.find(session[:user_id])
        post = user.posts.create!(post_params)
        render json: post, status: :created 
    end

    def destroy
        user = User.find(session[:user_id])
        post = user.posts.find(params[:id])
        post.destroy
        render json: {}
    end

    private

    def post_params
        params.permit(:title, :post)

    end
end
