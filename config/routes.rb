# config/routes.rb
Rails.application.routes.draw do
  resources :posts
  resources :comments, only: [:create]
  get "/posts/search/search=:search", to: "posts#search"
  get "/users/search/search=:search", to: "users#search"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  post "/signup", to: "users#create"
  get "/me", to: "users#show"

  patch "/changepassword", to: "users#changepassword"
  patch "/resetpassword", to: "users#resetpassword"

  get "/confirmemail/:confirm_token", to: "users#confirm_email"

  post "/send_email_to_reset_password", to: "users#reset_password_send_email"

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end