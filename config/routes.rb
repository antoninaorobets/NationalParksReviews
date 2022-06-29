Rails.application.routes.draw do
 
  scope :api do
    #/api/parks/:park_id/comments
    resources :parks, only: [:index, :show] do
      resources :comments
    end

    #/api/users/:user_id/parks
    resources :users, only: [:show] do
      resources :parks, only: [:index]
    end
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  post '/api/signup', to: 'users#create'
  get '/api/me', to: 'users#show'
  post '/api/login', to: 'sessions#create'
  delete '/api/logout', to: 'sessions#destroy'

  get '/api/hello', to: 'application#hello_world'

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
