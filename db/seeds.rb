# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

def image(path)
  File.open(Rails.root.join(path))
end

# To reset all the data in the database:
#    rails db:schema:load
#    rails db:seed


# new profile
gavin = Profile.create(name: "Gavin", about_me: "Ruby developer and improviser", quote: "Time is an illusion, lunchtime doubly so")
# Manual image uploading
gavin.profile_image.attach(io: image('client/src/assets/picklerick.jpg'), filename: 'picklerick.jpg')
gavin.cover_image.attach(io: image('client/src/assets/space.jpeg'), filename: 'space.jpeg')
# posts
post = gavin.posts.create(title: "About SDG", body: "blah blah blah")
post.post_image.attach(io: image('client/src/assets/dev.jpeg'), filename: 'dev.jpeg')

post = gavin.posts.create(title: "About APU", body: "My improv team is called APU")
post.post_image.attach(io: image('client/src/assets/dev.jpeg'), filename: 'dev.jpeg')
# end

# new profile
jason = Profile.create(name: "Jason", about_me: "Ruby developer and CEO", quote: "hmmmm.....djhfjsh")
# Manual image uploading
jason.profile_image.attach(io: image('client/src/assets/picklerick.jpg'), filename: 'picklerick.jpg')
jason.cover_image.attach(io: image('client/src/assets/space.jpeg'), filename: 'space.jpeg')
# posts
post = jason.posts.create(title: "How to create a code school", body: "blah blah")
post.post_image.attach(io: image('client/src/assets/dev.jpeg'), filename: 'dev.jpeg')

post = jason.posts.create(title: "How to create a other things", body: "blah blah")
post.post_image.attach(io: image('client/src/assets/dev.jpeg'), filename: 'dev.jpeg')
# end

# new profile
shea = Profile.create(name: "shea", about_me: "creater of this app", quote: "resilence")
# Manual image uploading
shea.profile_image.attach(io: image('client/src/assets/picklerick.jpg'), filename: 'picklerick.jpg')
shea.cover_image.attach(io: image('client/src/assets/space.jpeg'), filename: 'space.jpeg')
# posts
post = shea.posts.create(title: "How to do stuff", body: "blah blah")
post.post_image.attach(io: image('client/src/assets/dev.jpeg'), filename: 'dev.jpeg')

post = shea.posts.create(title: "How to do more stuff", body: "blah blah")
post.post_image.attach(io: image('client/src/assets/dev.jpeg'), filename: 'dev.jpeg')

post = shea.posts.create(title: "How do i get this backend stuff down?", body: "resilence i guess? meet up this weekend?")
post.post_image.attach(io: image('client/src/assets/dev.jpeg'), filename: 'dev.jpeg')
# end

tag.create(name: "general")
tag.create(name: "life")
tag.create(name: "health")
tag.create(name: "Web development")
tag.create(name: "automotive")
tag.create(name: "sports")
tag.create(name: "gaming")
tag.create(name: "cooking")



# api only instructions
# rails new --app
# rails generate models
# add in data
# add in react app


# (pt.1) adding images: add in image uploading and set up relationships to posts using Active_storage
# [x] add in Rails active_storage:install in terminal
# [x] add in has_one_attached :image in the models
# [] under the profile and post controller require an image for the data input
#     - :picture
# [] run rails db:migrate in terminal
# (pt.2) resizing images 
# [x] add in gem for mini_magic
#   - Bundle add mini_magic
# [x] add in imagemagic globally if not done already
#   - Brew install imagemagic
#     - this allows us to resize images like so 
#       - <% image_tag @car.picture.variant(resize: “75x75”)%>


# notes:
# - url_for is the active storage insert for targeting the images
#   ex) <img src=”<% url_for(@car.picture)%>”


# add in react app
# https://suncoast.io/handbook/resources/add-react-app-to-rails  
# skip step 1
# get capstone-v2 in the ruby app and rename it as client - lowercase c
# then go see gavin for getting rid of github connection 


# when clicking on comment to see all comments for a post 
# pass the id and pull the data for that comment  
# comments  
# - profile image
# - profile name
# - comment_body



#   - posts 
#     - header
#     - body  
#   - images 
#     - profile image
#     - cover image
#     - posts images
#   - interested posts  
#   - recommended posts 




# ..........................
# @channel Gavin’s “HOW TO SUCCEED AT CAPSTONE” (Ruby Edition)

# 1) Make a new rails app
# 2) do `rails g model` as often as you like - and setup your various `belongs_to` and `has_many` relations
# 3) Generate some sample/fake data
# 4) Merge your react app into your app as the `client` folder
# 5) Start with a part of your API that is showing/listing data
# 6) Convert static HTML to static data from `this.state`  (e.g. static `ul` / `li` example from the Taco Locations app) - Then change UI to use `map` to iterate over state to dynamically generate your UI
# 7) The JSON you have in `this.state` will be the JSON you need from your controllers.
# 8) Generate a controller. See how we created a controller to `index` (list) all the taco locations - Have the controller build a JSON structure like the one you made in steps 5 + 6
# 9) Change hard coded state to using axios to fetch from your API
# 10) Refresh the UI if you need things like maps, etc.
# 11) Keep repeating steps 6 through 9 for parts of your app that show data
# 12) Then work on the parts of your app that create/edit data through forms.
# ..........................



#
# creating a controller
#
# in terminal
#   - rails generate controller api/profiles

# in routes.rb
#   Rails.application.routes.draw do
#     # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
#     get "/api/profiles/:id", to: "api/profiles#show"
#   end

#   in profile controller
#   class Api::ProfilesController < ApplicationController
#     def show
#       profile_id = params[:id]
  
#       profile = Profile.find(profile_id)
  
#       render json: {
#         profile: {
#           name: profile.name, 
  
#         }
#       }
#     end




# to do list Ruby
# []



# to do list React
# [] fix links wrapper in links issue
# [] footer issue - needs to be positioned at the bottom always
# [] post component - when clicked add to my interested box
# [] post component - disply number of comment and people interested. this will be done by doing a .length in react
# [] implement moment for post timestamp. did already yarn add moment
# [] Profile component - each struggle and strength needs to have a  tag tied to it
# [] Profile component - add to community button need to be name when its yourself. this only matters if I keep the my community component for the MVP
# [] profile component - community logo needs to go to users profile. could be done by passing the id
# [] profile component - create form page
# [] header component - hamburger menu --my profile--recommended posts--interested posts--mission--creator--sign out--search options
# [] header component - make notifications button dynamic when there is a new notification 
# [] postwithcomments component - find a way to remove comment logo and display all comments without having to hard code most of the post html again. there is alot of repeated code here.
# [] peopleinterested component - add to community option for hamburger menu. if we keep the my community option
# [] createapost component - this will be a form page. could try changing things directy on page. notes there on idea of how. 
# [] updateprofile component - this will be a form page. could try changing things directy on page. notes there on createapost componert idea of how.
# [] createapost component - finish css and tie it to tags
# [] friendrequests component - add friend and remove friend option. if decided to keep my community option
# [] mission and creator components - make back button clickable and go to previous page 
# [] mycommunity component - hamburger menu remove friend option
# [] postwithcomments - when clicked add to my interested posts
# [] signin component - style again, add Oauth


