class CommentsController < ApplicationController
    def create
        post = Post.find(params[:post_id])
        post.comments.create(user_id: params[:user_id], comment: params[:comment])
        render json: post, status: :created
    end

    def destroy
        comment = Comment.find(params[:id])
        comment.destroy
        render json: {}
    end
end