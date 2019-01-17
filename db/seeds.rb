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
postOne.post_image.attach(io: image('client/src/assets/dev.jpeg'), filename: 'dev.jpeg')

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


# create a comment
Comment.create!(profile: shea, post: postOne, body: "im going to help you")
Comment.create!(profile: shea, post: postOne, body: "imma baller")
Comment.create!(profile: jason, post: postOne, body: "hey brotha i can help too")
Comment.create!(profile: gavin, post: postOne, body: "thannnkkkksss")


# to do list React
# [1/2] post component - disply number of comment and people interested. this will be done by doing a .length in react
# [] implement moment for post timestamp. did already yarn add moment
# [] notifications - make notifications button dynamic when there is a new notification 
# [] go through all pages and components - add @media to all
# [x] add a post option - get form going
# [x] fix links wrapper in links issue
# [x] footer issue - needs to be positioned at the bottom always
# [x] post component - when clicked add to my interested box
# [x] Profile component - each struggle and strength needs to have a  tag tied to it
# [x] profile component - community logo needs to go to users profile. could be done by passing the id
# [x] profile component - create form page, update profile
# [x] postwithcomments component - find a way to remove comment logo and display all comments without having to hard code most of the post html again. there is alot of repeated code here.
# [x] createapost component - this will be a form page. could try changing things directy on page. notes there on idea of how. 
# [x] createapost component - finish css and tie it to tags
# [x] signin component - style again, add Oauth
# [x] make a guard clause for when clicked on current profile post 

# to do list Ruby
# [] deploy 
# [] finish active storage setup and set up cloud image service
# [] notifications - recieve last 10 comments on my posts
# [] get list of people interested in a post
# [] set up count of people interested in a post
# [x] delete post, button and id select id in place already


