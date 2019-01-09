# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# To reset all the data in the database:
#    rails db:schema:load db:seed
gavin = Profile.create(name: "Gavin", about_me: "Ruby developer and improviser", quote: "Time is an illusion, lunchtime doubly so")
gavin.posts.create(title: "About SDG", body: "blah blah blah")
gavin.posts.create(title: "About APU", body: "My improv team is called APU")

jason = Profile.create(name: "Jason", about_me: "CEO of SDG", quote: "Whoa!")
jason.posts.create(title: "How to create a code school", body: "blah blah")
jason.posts.create(title: "How to create a other things", body: "blah blah")

shea = Profile.create(name: "shea", about_me: "creater of this app", quote: "resilence")
shea.posts.create(title: "How to do stuff", body: "blah blah")
shea.posts.create(title: "How to do more stuff", body: "blah blah")
shea.posts.create(title: "How do i get this backend stuff down?", body: "resilence i guess? meet up this weekend?")



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
# [] add in gem for mini_magic
#   - Bundle add mini_magic
# [] add in imagemagic globally if not done already
#   - Brew install imagemagic
#     - this allows us to resize images like so 
#       - <% image_tag @car.picture.variant(resize: “75x75”)%>
  




# notes:
# - url_for is the active storage insert for targeting the images
#   ex) <img src=”<% url_for(@car.picture)%>”




# add in react app
# https://suncoast.io/handbook/resources/add-react-app-to-rails  
# skip 1 ,3 , 7
# get capstone-v2 in the ruby app and rename it as client - lowercase c
# then go see gavin for getting rid of github connection


# data response 
# click on Profile
# pass the id and pull the data for that Profile  
#   - profile info
#     - name 
#     - about_me  
#     - quote
# {
#   profile: {
#     name: "shea", 
#     about_me: "I enjoy learning and growing through challenges", 
#     quote: "resilence"
#   }
# }

# posts [
#   {
#   title: "How to do stuff", 
#   image: image_url_here, 
#   body: "blah blah"
#   }, 
#   {
#   title: "How to do more stuff", 
#   image: image_url_here, 
#   body: "blah blah"
#   }, 
#   {
#   title: "How do i get this backend stuff down?", 
#   image: image_url_here, 
#   body: "resilence i guess? meet up this weekend?"
# }
# ]


#   - posts 
#     - header
#     - body  
#   - images 
#     - profile image
#     - cover image
#     - posts images
#   - interested posts  
#   - recommended posts 
