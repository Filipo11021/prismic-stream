Rails.application.routes.draw do
  resource :session
  resources :passwords, param: :token
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  root "channels#index"

  get "channels/:username", to: "channels#show"

  resources :channels do
    resources :messages, only: :create
  end

  get "/register", to: "users#new"
  post "/users", to: "users#create"

  get "/settings", to: "channels#settings"
  post "/channels/stream-key", to: "channels#new_stream_key"
  post "/channels/title", to: "channels#new_title"

  post "/users/avatar", to: "users#new_avatar"

  resources :users do
    resource :follow, only: [ :create, :destroy ]
  end

  namespace :api do
    namespace :v1 do
      post "/validate-stream-auth", to: "stream_auth#validate"
    end
  end
end
