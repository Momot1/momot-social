class UserChatSerializer < ActiveModel::Serializer
    attributes :id

    has_many :messages

    # def messages
    #     object.messages
    # end
end