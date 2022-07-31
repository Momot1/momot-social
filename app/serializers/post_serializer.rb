class PostSerializer < ActiveModel::Serializer
  attributes :id, :post, :title, :user_id, :username
  has_many :comments

  def username
    object.user.username
  end
end
