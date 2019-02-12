Rails.application.routes.draw do
  namespace :api do
    get 'profile_taggings/index'
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
   # all options [:show, :create, :index, :destroy, :update]

  namespace :api do 
    resources :profiles, only: [:show, :update]
    resources :profile_taggings, only: [:index]
    # add in a delete profile option on front end and get working. 
    resources :posts, only: [:show, :create, :update, :destroy]
    resources :tags, only: [:index]
    resources :comments
    resources :interested_posts, only: [:create, :destroy, :show]
  end
end
