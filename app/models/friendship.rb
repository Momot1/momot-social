class Friendship < ApplicationRecord
    belongs_to :user
    belongs_to :friend, class_name: "User"

    # after_create do |p|
    #     if !Friendship.find_by(user_id: p.friend_id)
    #         Friendship.create(user_id: p.friend_id, friend_id: p.user_id)
    #     end
    # end

    # after_update do |p|

    # end

    # after_destroy do |p|

    # end
end
