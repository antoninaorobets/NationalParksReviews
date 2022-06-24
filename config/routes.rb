Rails.application.routes.draw do
  resources :comments
  resources :parks, only: [:index, :show]

  resources :users, only: [:show] do
    # nested resource for reviews
    resources :parks, only: [:index]
  end


  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  get '/hello', to: 'application#hello_world'
end
