Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get "/api/profiles/current", to: "api/profiles#current"
  
  get "/api/profiles/:id", to: "api/profiles#show"

  put "api/profiles/update", to: "api/profiles#update"
  
  post "/api/posts", to: "api/posts#create"
  get "/api/posts/:id", to: "api/posts#show"
  # delete "/api/posts/delete/:id", to: "/api/post#delete/"

  post "/api/comment/create", to: "api/comments#create"

  get "/api/tags", to: "api/tags#show"

  get "/api/profiles/:id/recommendedposts", to: "api/profiles#recommendedPosts"

  get "/api/profiles/:id/interestedposts", to: "api/profiles#interestedPosts"

  if Rails.env.production?
    CLIENT_HTML = File.read(Rails.root.join('public/index.html'))

    get "*path", to: proc { [200, {}, [CLIENT_HTML]] }
  end
end
