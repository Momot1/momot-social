class UserFriendsSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :username, :birthday, :email, :pending

  def pending
    object.friends
  end

end