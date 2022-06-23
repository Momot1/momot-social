class User < ApplicationRecord
    has_secure_password
    validates :password_confirmation, :first_name, :last_name, presence: true
    validates :email, :username, uniqueness: { case_sensitive: false }, format: { with: /\A[a-zA-Z0-9]+\Z/ }
    
end
