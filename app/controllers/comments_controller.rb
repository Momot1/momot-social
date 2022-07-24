class CommentsController < ApplicationController
    def create
        post = Post.find(params[:post_id])
        post.comments.create(user_id: params[:user_id], comment: params[:comment])
        render json: post, status: :created
    end
end