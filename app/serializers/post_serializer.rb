class PostSerializer < ActiveModel::Serializer
  attributes :id, :post, :title, :user_id
end
