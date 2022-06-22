class User < ApplicationRecord
    has_secure_password
    validates :email, :username, uniqueness: true
    validates :email, :username, :first_name, :last_name, :password, presence: true
end
