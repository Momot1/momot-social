class PostSerializer < ActiveModel::Serializer
  attributes :id, :post, :title, :user_id, :username, :image_url, :likes, :comments_count
  has_many :comments

  def username
    object.user.username
  end

  def likes
    object.likes.count
  end

  def comments_count 
    object.comments.count
  end

end
