# config/routes.rb
Rails.application.routes.draw do
  resources :likes, only: [:create, :destroy]
  resources :posts
  resources :comments, only: [:create, :destroy]
  resources :messages, only: [:create]
  resources :user_chats, only: [:create]
  get "/posts/search/search=:search", to: "posts#search"
  get "/users/search/search=:search", to: "users#search"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  delete "/users/removefriend/:id", to: "users#remove_friend"
  delete "/users/:id", to: "users#destroy"
  post "/users/addfriend", to: "users#add_friend"
  get "/users/confirmfriend/:id", to: "users#confirm_friend"
  get "/users/posts/:username", to: "users#posts"

  patch "/changepassword", to: "users#changepassword"
  patch "/resetpassword", to: "users#resetpassword"

  get "/confirmemail/:confirm_token", to: "users#confirm_email"

  post "/send_email_to_reset_password", to: "users#reset_password_send_email"

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end