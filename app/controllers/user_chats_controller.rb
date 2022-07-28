class UserChatsController < ApplicationController
    def create
        chat = Chat.create()
        user = User.find(session[:user_id])
        user.user_chats.create(chat_id: chat.id)
        UserChat.create(chat_id: chat.id, user_id: params[:recipientUser])
        render json: user, include: "**"
    end
end