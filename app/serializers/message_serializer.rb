class MessageSerializer < ActiveModel::Serializer
    attributes :id, :message, :user_id
end