class UserChatSerializer < ActiveModel::Serializer
    attributes :id

    has_many :messages
    has_many :users, serializer: UserFriendsSerializer

    # def messages
    #     object.messages
    # end
end