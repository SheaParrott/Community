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
# admin tag is good for first posts when creating an account. if kept, need to filter this tag out of options anytime we map through all tags
admin = Tag.create!(name: "admin") 
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
gavin.cover_image.attach(io: image('client/src/assets/space.jpg'), filename: 'space.jpg')

# This says, GAVIN (the profile) has a STRENGTH (boolean) in WEB (tag)
ProfileTagging.create!(profile: gavin, tag: web, strength: true)
ProfileTagging.create!(profile: gavin, tag: life, strength: true)
ProfileTagging.create!(profile: gavin, tag: networking, strength: true)

# This says, GAVIN (the profile) has a WEAKNESS (boolean) in HEALTH (tag)
ProfileTagging.create!(profile: gavin, tag: health, strength: false)
ProfileTagging.create!(profile: gavin, tag: automotive, strength: false)
ProfileTagging.create!(profile: gavin, tag: gaming, strength: false)


# [x , x, ] posts the user made, then post tagging, then interestedpost for one use to this post 
postOne  = gavin.authored_posts.create!(title: "About SDG", body: "blah blah blah", tags: [gaming, web, networking])
postOne.post_image.attach(io: image('client/src/assets/dev.jpg'), filename: 'dev.jpg')

# [old way, now have validations, so doesnt work] create a bunch of of post taggings. associate posts with multiple tags
# PostTagging.create!(post: postThree, tag: sports)
# PostTagging.create!(post: postThree, tag: web)
# PostTagging.create!(post: postThree, tag: automotive)

postTwo = gavin.authored_posts.create!(title: "About APU", body: "My improv team is called APU", tags: [gaming, web, networking])
postTwo.post_image.attach(io: image('client/src/assets/dev.jpg'), filename: 'dev.jpg')

# end


# new profile
jason = Profile.create!(name: "Jason", about_me: "Ruby developer and CEO", quote: "hmmmm.....djhfjsh")

# Manual image uploading
jason.profile_image.attach(io: image('client/src/assets/picklerick.jpg'), filename: 'picklerick.jpg')
jason.cover_image.attach(io: image('client/src/assets/space.jpg'), filename: 'space.jpg')

# This says, JASON (the profile) has a STRENGTH (boolean) in WEB (tag)
ProfileTagging.create!(profile: jason, tag: web, strength: true)
ProfileTagging.create!(profile: jason, tag: automotive, strength: true)
ProfileTagging.create!(profile: jason, tag: gaming, strength: true)

# This says, JASON (the profile) has a WEAKNESS (boolean) in HEALTH (tag)
ProfileTagging.create!(profile: jason, tag: health, strength: false)
ProfileTagging.create!(profile: jason, tag: life, strength: false)
ProfileTagging.create!(profile: jason, tag: networking, strength: false)

# [x , x, ] posts the user made, then post tagging, then interestedpost for one use to this post 
postThree = jason.authored_posts.create!(title: "How to create a code school", body: "blah blah", tags: [sports, web, automotive])
postThree.post_image.attach(io: image('client/src/assets/dev.jpg'), filename: 'dev.jpg')




postFour = jason.authored_posts.create!(title: "How to create a other things", body: "blah blah", tags: [cooking, web, automotive])
postFour.post_image.attach(io: image('client/src/assets/dev.jpg'), filename: 'dev.jpg')


# end

# new profile
shea = Profile.create!(name: "shea", about_me: "creater of this app", quote: "resilence")
# Manual image uploading
shea.profile_image.attach(io: image('client/src/assets/picklerick.jpg'), filename: 'picklerick.jpg')
shea.cover_image.attach(io: image('client/src/assets/space.jpg'), filename: 'space.jpg')

# This says, SHEA (the profile) has a STRENGTH (boolean) in WEB (tag)
ProfileTagging.create!(profile: shea, tag: health, strength: true)
ProfileTagging.create!(profile: shea, tag: automotive, strength: true)
ProfileTagging.create!(profile: shea, tag: gaming, strength: true)

# This says, SHEA (the profile) has a WEAKNESS (boolean) in HEALTH (tag)
ProfileTagging.create!(profile: shea, tag: sports, strength: false)
ProfileTagging.create!(profile: shea, tag: cooking, strength: false)
ProfileTagging.create!(profile: shea, tag: general, strength: false)

# [x , x, ] posts the user made, then post tagging, then interestedpost for one use to this post 
postFive = shea.authored_posts.create!(title: "How to do stuff", body: "blah blah", tags: [general, sports, automotive])
postFive.post_image.attach(io: image('client/src/assets/dev.jpg'), filename: 'dev.jpg')

postSix = shea.authored_posts.create!(title: "How do i get this backend stuff down?", body: "resilence i guess? meet up this weekend?", tags: [life, health, gaming])
postSix.post_image.attach(io: image('client/src/assets/dev.jpg'), filename: 'dev.jpg')

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

# to do list
# [] come up with tags - Admin, Life, 
# [] filter out the admin tag in backend - admin tag is purely for the posts created on profile create
