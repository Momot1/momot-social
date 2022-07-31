class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :is_admin, :birthday, :first_name, :last_name, :test

  has_many :friends, serializer: UserFriendsSerializer

  has_many :friendships, serializer: FriendshipSerializer

  has_many :chats, serializer: UserChatSerializer

  def test
    pending = object.friendships.where(status: "requested")
    confirmed = object.friendships.where(status: "confirmed")

    {pending: pending, confirmed: confirmed}
  end
end
