class CommentSerializer < ActiveModel::Serializer
  attributes :id, :comment, :username

  def username
    object.user.username
  end

end
