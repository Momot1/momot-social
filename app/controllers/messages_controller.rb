class MessagesController < ApplicationController
    def create
        user = User.find(session[:user_id])
        user.messages.create(chat_id: params[:chat_id], message: params[:message])
        render json: user, include: "**", status: :created
    end
end