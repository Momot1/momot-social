class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :is_admin, :birthday, :first_name, :last_name

  has_many :friends, serializer: UserFriendsSerializer
end