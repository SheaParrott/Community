Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get "/api/profiles/:id", to: "api/profiles#show"
  
  post "/api/post/create", to: "api/post#create"
  get "/api/posts/:id", to: "api/posts#show"

  get "/api/tags", to: "api/tags#show"





  if Rails.env.production?
    CLIENT_HTML = File.read(Rails.root.join('public/index.html'))

    get "*path", to: proc { [200, {}, [CLIENT_HTML]] }
  end
end
