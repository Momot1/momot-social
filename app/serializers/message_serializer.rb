class MessageSerializer < ActiveModel::Serializer
    attributes :id, :message, :user_id, :created_at
end