Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
   # all options [:show, :create, :index, :destroy, :update]

  namespace :api do 
    resources :profiles, only: [:show, :update]
    # add in a delete profile option on front end and get working. 
    # all options [:show, :create, :index, :destroy, :update]
    resources :posts, only: [:show, :create, :update, :destroy]
    resources :tags, only: [:index]
    resources :comments
    resources :interested_posts, only: [:create, :destroy]
  end


  # get "/api/profiles/current", to: "api/profiles#current"
  
  # get "/api/profiles/:id", to: "api/profiles#show"
  # get "/api/profiles/:id/posts", to: "api/profiles#interested_or_recommended"

  # put "api/profiles/update", to: "api/profiles#update"
  
  # post "/api/posts", to: "api/posts#create"
  # get "/api/posts/:id", to: "api/posts#show"
  # delete "/api/posts/:id", to: "api/posts#destroy"
  # put "/api/posts/update", to: "api/posts#update"


  # post "/api/interested_posts", to: "api/interested_posts#create"
  # delete "/api/interested_posts/:id", to: "api/interested_posts#destroy"

  # get "/api/comment/:id", to: "api/comments#show"
  # post "/api/comment/create", to: "api/comments#create"
  # delete "/api/comment/:id", to: "api/comments#delete"
  # put "/api/comment/update", to: "api/comments#update"

  # get "/api/tags", to: "api/tags#show"


  # get "/api/comments", to: "api/comments#index"
end
