class User < ApplicationRecord
    before_create :confirmation_token
    has_secure_password
    validates :password_confirmation, :first_name, :last_name, presence: true
    validates :email, :username, uniqueness: { case_sensitive: false }
    validates :username, format: { with: /\A[a-zA-Z0-9]+\Z/ }
    validates :email, format: { with: /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/ }

    has_many :posts, dependent: :destroy
    has_many :comments, dependent: :destroy
    has_many :messages, dependent: :destroy
    has_many :likes, dependent: :destroy
    has_many :user_chats, dependent: :destroy
    has_many :chats, through: :user_chats, dependent: :destroy

    has_many :friendships,
        ->(user) { FriendshipsQuery.both_ways(user_id: user.id) },
        inverse_of: :user,
        dependent: :destroy

    has_many :friends,
        ->(user) { UsersQuery.friends(user_id: user.id, scope: true) },
        through: :friendships
    

    def generate_password_reset_token
        self.reset_password_token = SecureRandom.urlsafe_base64.to_s
        self.password_token_sent_at = Time.now.utc
        self.save!(validate: false)
    end

    private

    def confirmation_token
        if self.confirm_token.blank?
            self.confirm_token = SecureRandom.urlsafe_base64.to_s
        end
    end
end
