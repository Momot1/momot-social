class PostSerializer < ActiveModel::Serializer
  attributes :id, :post, :title, :user_id, :username, :image_url
  has_many :comments

  def username
    object.user.username
  end

end
