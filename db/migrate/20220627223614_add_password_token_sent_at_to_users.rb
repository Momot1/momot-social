class AddPasswordTokenSentAtToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :password_token_sent_at, :datetime
  end
end
