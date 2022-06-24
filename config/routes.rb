# config/routes.rb
Rails.application.routes.draw do
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  post "/signup", to: "users#create"
  get "/me", to: "users#show"

  patch "/changepassword", to: "users#changepassword"

  get "/confirmemail/:confirm_token", to: "users#confirm_email"

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end