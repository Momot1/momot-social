class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :is_admin, :birthday, :first_name, :last_name, :friends

  # has_many :friends, serializer: UserFriendsSerializer

  # has_many :friendships, serializer: FriendshipSerializer

  has_many :chats, serializer: UserChatSerializer

  def friends
    columns = "id, first_name, last_name, username, birthday, email"

    pending = []
    object.friendships.where(status: "pending").each do |friendship|
      if object.id == friendship.user_id
        user = User.where(id: friendship.friend_id).select(columns).first
        pending.push({friend: user, sender_id: friendship.user_id, id: friendship.id})
      else
        user = User.where(id: friendship.user_id).select(columns).first
        pending.push({friend: user, sender_id: friendship.user_id, id: friendship.id})
      end
      # pending.push({user_id: object.id, friendship_user_id: friendship.user_id})
    end

    confirmed = []
    object.friendships.where(status: "confirmed").each do |friendship|
      if object.id == friendship.user_id
        user = User.where(id: friendship.friend_id).select(columns).first
        confirmed.push(user)
      else
        user = User.where(id: friendship.user_id).select(columns).first
        confirmed.push(user)
      end
    end
    # confirmed = object.friendships.where(status: "confirmed")

    {pending: pending, confirmed: confirmed}
    # object.friendships.where(status: "confirmed")
  end
end
