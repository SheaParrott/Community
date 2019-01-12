# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create!([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create!(name: 'Luke', movie: movies.first)

def image(path)
  File.open(Rails.root.join(path))
end

# To reset all the data in the database:
#    rails db:schema:load
#    rails db:seed

#tags
general = Tag.create!(name: "general")
life = Tag.create!(name: "life")
health = Tag.create!(name: "health")
web = Tag.create!(name: "Web development")
automotive = Tag.create!(name: "automotive")
sports = Tag.create!(name: "sports")
gaming = Tag.create!(name: "gaming")
cooking = Tag.create!(name: "cooking")
networking = Tag.create!(name: "networking")

# new profile
gavin = Profile.create!(name: "Gavin", about_me: "Ruby developer and improviser", quote: "Time is an illusion, lunchtime doubly so")

# Manual image uploading
gavin.profile_image.attach(io: image('client/src/assets/picklerick.jpg'), filename: 'picklerick.jpg')
gavin.cover_image.attach(io: image('client/src/assets/space.jpeg'), filename: 'space.jpeg')

# This says, GAVIN (the profile) has a STRENGTH (boolean) in WEB (tag)
ProfileTagging.create!(profile: gavin, tag: web, strength: true)
ProfileTagging.create!(profile: gavin, tag: life, strength: true)
ProfileTagging.create!(profile: gavin, tag: networking, strength: true)

# This says, GAVIN (the profile) has a WEAKNESS (boolean) in HEALTH (tag)
ProfileTagging.create!(profile: gavin, tag: health, strength: false)
ProfileTagging.create!(profile: gavin, tag: automotive, strength: false)
ProfileTagging.create!(profile: gavin, tag: gaming, strength: false)

# [x , x, ] posts the user made, then post tagging, then interestedpost for one use to this post 
postOne  = gavin.authored_posts.create!(title: "About SDG", body: "blah blah blah")
postOne .post_image.attach(io: image('client/src/assets/dev.jpeg'), filename: 'dev.jpeg')

# [-, x, -] create a bunch of of post taggings. associate posts with multiple tags
PostTagging.create!(post: postOne , tag: gaming)
PostTagging.create!(post: postOne , tag: web)
PostTagging.create!(post: postOne , tag: networking)


postTwo = gavin.authored_posts.create!(title: "About APU", body: "My improv team is called APU")
postTwo.post_image.attach(io: image('client/src/assets/dev.jpeg'), filename: 'dev.jpeg')

# [-, x, -] create a bunch of of post taggings. associate posts with multiple tags
PostTagging.create!(post: postTwo, tag: gaming)
PostTagging.create!(post: postTwo, tag: web)
PostTagging.create!(post: postTwo, tag: networking)

# end


# new profile
jason = Profile.create!(name: "Jason", about_me: "Ruby developer and CEO", quote: "hmmmm.....djhfjsh")

# Manual image uploading
jason.profile_image.attach(io: image('client/src/assets/picklerick.jpg'), filename: 'picklerick.jpg')
jason.cover_image.attach(io: image('client/src/assets/space.jpeg'), filename: 'space.jpeg')

# This says, JASON (the profile) has a STRENGTH (boolean) in WEB (tag)
ProfileTagging.create!(profile: jason, tag: web, strength: true)
ProfileTagging.create!(profile: jason, tag: automotive, strength: true)
ProfileTagging.create!(profile: jason, tag: gaming, strength: true)

# This says, JASON (the profile) has a WEAKNESS (boolean) in HEALTH (tag)
ProfileTagging.create!(profile: jason, tag: health, strength: false)
ProfileTagging.create!(profile: jason, tag: life, strength: false)
ProfileTagging.create!(profile: jason, tag: networking, strength: false)

# [x , x, ] posts the user made, then post tagging, then interestedpost for one use to this post 
postThree = jason.authored_posts.create!(title: "How to create a code school", body: "blah blah")
postThree.post_image.attach(io: image('client/src/assets/dev.jpeg'), filename: 'dev.jpeg')

# [-, x, -] create a bunch of of post taggings. associate posts with multiple tags
PostTagging.create!(post: postThree, tag: sports)
PostTagging.create!(post: postThree, tag: web)
PostTagging.create!(post: postThree, tag: automotive)


postFour = jason.authored_posts.create!(title: "How to create a other things", body: "blah blah")
postFour.post_image.attach(io: image('client/src/assets/dev.jpeg'), filename: 'dev.jpeg')

# [-, x, -] create a bunch of of post taggings. associate posts with multiple tags
PostTagging.create!(post: postFour, tag: cooking)
PostTagging.create!(post: postFour, tag: web)
PostTagging.create!(post: postFour, tag: automotive)

# end

# new profile
shea = Profile.create!(name: "shea", about_me: "creater of this app", quote: "resilence")
# Manual image uploading
shea.profile_image.attach(io: image('client/src/assets/picklerick.jpg'), filename: 'picklerick.jpg')
shea.cover_image.attach(io: image('client/src/assets/space.jpeg'), filename: 'space.jpeg')

# This says, SHEA (the profile) has a STRENGTH (boolean) in WEB (tag)
ProfileTagging.create!(profile: shea, tag: health, strength: true)
ProfileTagging.create!(profile: shea, tag: automotive, strength: true)
ProfileTagging.create!(profile: shea, tag: gaming, strength: true)

# This says, SHEA (the profile) has a WEAKNESS (boolean) in HEALTH (tag)
ProfileTagging.create!(profile: shea, tag: sports, strength: false)
ProfileTagging.create!(profile: shea, tag: cooking, strength: false)
ProfileTagging.create!(profile: shea, tag: general, strength: false)

# [x , x, ] posts the user made, then post tagging, then interestedpost for one use to this post 
postFive = shea.authored_posts.create!(title: "How to do stuff", body: "blah blah")
postFive.post_image.attach(io: image('client/src/assets/dev.jpeg'), filename: 'dev.jpeg')

# [-, x, -] create a bunch of of post taggings. associate posts with multiple tags
PostTagging.create!(post: postFive, tag: general)
PostTagging.create!(post: postFive, tag: sports)
PostTagging.create!(post: postFive, tag: automotive)


postSix = shea.authored_posts.create!(title: "How do i get this backend stuff down?", body: "resilence i guess? meet up this weekend?")
postSix.post_image.attach(io: image('client/src/assets/dev.jpeg'), filename: 'dev.jpeg')

# [-, x, -] create a bunch of of post taggings. associate posts with multiple tags
PostTagging.create!(post: postSix, tag: life)
PostTagging.create!(post: postSix, tag: health)
PostTagging.create!(post: postSix, tag: gaming)
# end

# [-, -, ] create some interested posts 
InterestedPost.create!(post: postSix , profile: gavin)
InterestedPost.create!(post: postFour , profile: gavin)
InterestedPost.create!(post: postOne  , profile: jason)
InterestedPost.create!(post: postFive , profile: jason)
InterestedPost.create!(post: postTwo , profile: shea)
InterestedPost.create!(post: postThree , profile: shea)



# [] then get the profile tags to display






# Next step:   this says BACKEND POST (the post) is related to WEB (tag)
# PostTagging.create!(post: backend_post, tag: web)

# api only instructions
# rails new --app
# rails generate models
# add in data
# add in react app


# add in react app
# https://suncoast.io/handbook/resources/add-react-app-to-rails  
# skip step 1
# get capstone-v2 in the ruby app and rename it as client - lowercase c
# then go see gavin for getting rid of github connection 


#
# creating a controller
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


#
# how app works instructions/notes
#
# when clicking on comment to see all comments for a post 
# pass the id and pull the data for that comment  
# comments  
# - profile image
# - profile name
# - comment_body




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



# to do list Ruby
# [] create a post endpoint
# [] add to interested posts endpoint
# [] create profile model
# - [] create seed data
# - [] go to react app, create json data and use static data to make dynamic
# - [] generate controller, make json return for data required
# - [] axios call for dynamic data
# - [] make a update profile method, using put axios, reload data
# [] create tag model
# [] create post model
# [] create a profileTaggiing model
# - belongs_to profile, belongs_to tag
# - add in all has_many, through relations
# - create seed data relations
# [] create a postTagging model
# - belongs_to post, belongs_to tag
# - add in all has_many, through relations
# - create seed data relations
# [] create a interested model
# - belongs_to post, belongs_to profile
# - add in all has_many, through relations
# - create seed data relations



# to do list React
# [] add a post option - get form going
# [] onClick function for adding to interested posts
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
# [] go through all pages and components - add @media to all

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




# create a form and create a post