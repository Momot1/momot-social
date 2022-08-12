class PostsController < ApplicationController
    skip_before_action :authorized, only: [:index, :search, :show]
    def index
        render json: Post.order("created_at DESC")
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
        post = Post.find(params[:id])
        post.destroy
        render json: {}
    end

    def search
        posts = Post.where("title LIKE ?", "%" + params[:search] + "%").order("created_at DESC")
        render json: posts
    end

    private

    def post_params
        params.permit(:title, :post, :image)
    end
end
