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
miscellaneous = Tag.create!(name: "Miscellaneous")
emotional = Tag.create!(name: "Emotional")
social = Tag.create(name: "Social")
technology = Tag.create!(name: "technology")
automotive = Tag.create!(name: "Automotive")
networking = Tag.create!(name: "Networking")

# new profile
gavin = Profile.create!(name: "Gavin", about_me: "Ruby developer and improviser", quote: "Time is an illusion, lunchtime doubly so")

# Manual image uploading
gavin.profile_image.attach(io: image('client/src/assets/gavin.jpg'), filename: 'gavin.jpg')
gavin.cover_image.attach(io: image('client/src/assets/two.jpg'), filename: 'two.jpg')

# This says, GAVIN (the profile) has a STRENGTH (boolean) in technology (tag)
ProfileTagging.create!(profile: gavin, tag: networking, strength: true)
ProfileTagging.create!(profile: gavin, tag: automotive, strength: true)
ProfileTagging.create!(profile: gavin, tag: social, strength: true)


# [x , x, ] posts the user made, then post tagging, then interestedpost for one use to this post 
postOne  = gavin.authored_posts.create!(title: "Where can I find the new documentation on Vue?", body: "I have pulled up their documentation on 'https://vuejs.org/'. I found this documentation to be robust and not informative enough. ", tags: [technology, networking])
postOne.post_image.attach(io: image('client/src/assets/vue.png'), filename: 'vue.png')

# [old way, now have validations, so doesnt work] create a bunch of of post taggings. associate posts with multiple tags
# PostTagging.create!(post: postThree, tag: sports)
# PostTagging.create!(post: postThree, tag: technology)
# PostTagging.create!(post: postThree, tag: automotive)

postTwo = gavin.authored_posts.create!(title: "New to town, need a friend and someone to show me around.", body: "I am new into town here in St. Petersburg, FL. Can someone show me around? Food on me for the day. ", tags: [social, miscellaneous, emotional])
postTwo.post_image.attach(io: image('client/src/assets/stp.jpg'), filename: 'stp.jpg')

# end


# new profile
jason = Profile.create!(name: "Jason", about_me: "Ruby developer and aspiring buisness creator", quote: "That which is not good for the bee-hive cannot be good for the bees.")

# Manual image uploading
jason.profile_image.attach(io: image('client/src/assets/jason.jpg'), filename: 'jason.jpg')
jason.cover_image.attach(io: image('client/src/assets/three.jpg'), filename: 'three.jpg')

# This says, JASON (the profile) has a STRENGTH (boolean) in technology (tag)
ProfileTagging.create!(profile: jason, tag: networking, strength: true)
ProfileTagging.create!(profile: jason, tag: automotive, strength: true)
ProfileTagging.create!(profile: jason, tag: social, strength: true)

# [x , x, ] posts the user made, then post tagging, then interestedpost for one use to this post 
postThree = jason.authored_posts.create!(title: "I need tips on how to create a business.", body: " I am thinking about starting my own code school. I need to know best practices on the begining stages", tags: [technology, networking])
postThree.post_image.attach(io: image('client/src/assets/business.jpg'), filename: 'business.jpg')




postFour = jason.authored_posts.create!(title: "Offering free coding class and help", body: "I am practicing on my curriculum for my code school I want to start. I am offering free code classes for a short period of time, for any interested.", tags: [networking, networking])
postFour.post_image.attach(io: image('client/src/assets/developer.jpg'), filename: 'developer.jpg')


# end

# new profile
shea = Profile.create!(name: "Mark Smith", about_me: "Aspiring developer, looking to take on the world by stor. Loves comedy shows, Pokemon, and taking nature walks.", quote: "resilence")
# Manual image uploading
shea.profile_image.attach(io: image('client/src/assets/mark.jpg'), filename: 'mark.jpg')
shea.cover_image.attach(io: image('client/src/assets/one.jpg'), filename: 'one.jpg')

# This says, SHEA (the profile) has a STRENGTH (boolean) in technology (tag)
ProfileTagging.create!(profile: shea, tag: networking, strength: true)
ProfileTagging.create!(profile: shea, tag: automotive, strength: true)
ProfileTagging.create!(profile: shea, tag: social, strength: true)


# [x , x, ] posts the user made, then post tagging, then interestedpost for one use to this post 
postFive = shea.authored_posts.create!(title: "Need help learning Redux", body: "Can anyone point me towards a good source for a beginner in the language?", tags: [networking, technology])
postFive.post_image.attach(io: image('client/src/assets/web.png'), filename: 'web.png')

postSix = shea.authored_posts.create!(title: "Want to learn how to play Magic the gathering card game.", body: "I have played pokemon cards over the years. Magic has always been really intriguing to me, but I have no friends that play it. Does anyone want to show me how? Or, does anyone know of a place I can go to meet local Magic players?", tags: [social, miscellaneous])
postSix.post_image.attach(io: image('client/src/assets/MTG.jpg'), filename: 'MTG.jpg')

# [-, -, ] create some interested posts 
InterestedPost.create!(post: postSix , profile: gavin)
InterestedPost.create!(post: postFour , profile: gavin)
InterestedPost.create!(post: postOne  , profile: jason)
InterestedPost.create!(post: postFive , profile: jason)
InterestedPost.create!(post: postTwo , profile: shea)
InterestedPost.create!(post: postThree , profile: shea)


# create a comment
Comment.create!(profile: shea, post: postOne, body: "try looking at my GitHub. I have thorough documentation on there for Vue")
Comment.create!(profile: gavin, post: postOne, body: "Awesome, I will look at it. Thank you very much!")
Comment.create!(profile: jason, post: postOne, body: "Im interested as well, thanks Mark!")

Comment.create!(profile: jason, post: postTwo, body: "I have been in St. Pete my whole life. I would love to meet up and show you around. How's saturday sound?")
Comment.create!(profile: shea, post: postTwo, body: "I am new to St. Pete as well! Can I join along?")
Comment.create!(profile: jason, post: postTwo, body: "You are more than welcome to join in my book Mark.")
Comment.create!(profile: gavin, post: postTwo, body: "Yeah, lets all get together saturday!")

Comment.create!(profile: shea, post: postThree, body: "I have 3 current running and thriving businesses. I would love to give you a few tips to get you started. ")
Comment.create!(profile: jason, post: postThree, body: "Great, Let me know a whens a good time to meet. I appreciate you reaching out")

Comment.create!(profile: shea, post: postFour, body: "Sign me up, I am always interested in growing my knowledge and helping others")
Comment.create!(profile: gavin, post: postFour, body: "Add me to the roster as well")

Comment.create!(profile: jason, post: postFive, body: "I am great in Redux. How about we grab lunch and discuss and go over some live code")
Comment.create!(profile: shea, post: postFive, body: "That would be fantastic, thank you very much!")

Comment.create!(profile: jason, post: postSix, body: "I have 15 fully built decks. I am free to meet up anytime on the weekends to show you the ropes. ")
Comment.create!(profile: shea, post: postSix, body: "Awesome, hows sunday sound?")
Comment.create!(profile: jason, post: postSix, body: "Sunday works for me, meet at Starbuck on 4th street at 12?")
Comment.create!(profile: shea, post: postSix, body: "Thats perfect for me, see you there!")


# to do list
# [] come up with tags - Admin, emotional, 
# [] filter out the admin tag in backend - admin tag is purely for the posts created on profile create
