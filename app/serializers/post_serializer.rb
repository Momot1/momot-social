class PostSerializer < ActiveModel::Serializer
  attributes :id, :post, :title, :user_id
  has_many :comments
end
