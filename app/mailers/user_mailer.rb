class UserMailer < ApplicationMailer
    default from: "momotsocialapp@gmail.com"

    def registration_confirmation(user)
        @user = user
        mail(:to => "#{user.first_name} <#{user.email}>", :subject => "Registration Confirmation")
    end

    def reset_password(user)
        @user = user
        mail(:to => "#{user.first_name} <#{user.email}>", :subject => "Reset Password")
    end
end
