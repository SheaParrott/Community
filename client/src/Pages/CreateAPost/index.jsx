import React, { Component } from 'react'
import Header from '../../Components/Header'
import requestimg from '../../assets/dev.jpeg'
import profileimg from '../../assets/picklerick.jpg'
import insertImage from '../../assets/insert-image.png'
import './style.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Footer from '../../Components/Footer'
import myDataStore from '../DataStore/DataStore'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'

class CreateAPost extends Component {
  // constructor(props) {
  //   super(props)

  //   this.state = {
  //     header: '',
  //     image: '',
  //     body: []
  //   }
  // }
  render() {
    return (
      <div>
        <Header />

        <section className="createAPostCentering">
          <h1 className="createAPost">Create a post</h1>
          <section className="createAPostBox">
            <h4 className="createAPostTitle">You header text here</h4>
            <img className="createAPostImage" src={insertImage} alt="request" />
            <p>body here</p>
          </section>
          <section className="tagsBox">
            {myDataStore.AllTags.map(tag => {
              // console.log(toJS(tag))
              return (
                <h5 className="tag" key={toJS(tag.id)}>
                  <input
                    type="checkbox"
                    value={toJS(tag.id)}
                    name="post[tag_ids][]"
                    placeholder={toJS(tag.name)}
                  />
                  <label>{toJS(tag.name)}</label>
                </h5>
              )
            })}
          </section>
          <button>Submit Post</button>
        </section>
        <form onSubmit="">
          <input type="text" name="post[title]" placeholder="title" />
          <input type="file" name="post[:post_image]" placeholder="image" />
          <input type="text" name="post[body]" placeholder="body" />
          <input type="checkbox" value="1" name="post[tag_ids][]" />
        </form>
        <Footer />
      </div>
    )
  }
}

export default observer(CreateAPost)

// 3 input boxes
// one chnages state for Header
// one changes state for Image
// last pushes the line onto the new array and then is mapped over to create the new li's

// would be nice if i can a more interactive post
// - add straight to the post
//   - click the header area to add in
//   - click an image area to add image
//   - click on first li to create first then enter to start a new li
// note think it can be done with an on click if state !== state then axios update then get new info

//
// []the way we create a post is. we target the profile
// []then we create a post with the appropriate parameters
// []then we pick a tag from all tags possible
// below are the notes how we did it in seed data
//

// # [x , x, ] posts the user made, then post tagging, then interestedpost for one use to this post
// postOne  = gavin.authored_posts.create!(title: "About SDG", body: "blah blah blah")
// postOne .post_image.attach(io: image('client/src/assets/dev.jpeg'), filename: 'dev.jpeg')

// # [-, x, -] create a bunch of of post taggings. associate posts with multiple tags
// PostTagging.create!(post: postOne , tag: gaming)
// PostTagging.create!(post: postOne , tag: web)
// PostTagging.create!(post: postOne , tag: networking)

// general = Tag.create!(name: "general")
// life = Tag.create!(name: "life")
// health = Tag.create!(name: "health")
// web = Tag.create!(name: "Web development")
// automotive = Tag.create!(name: "automotive")
// sports = Tag.create!(name: "sports")
// gaming = Tag.create!(name: "gaming")
// cooking = Tag.create!(name: "cooking")
// networking = Tag.create!(name: "networking")

//this is from post.rb
// # post "/api/post/create"

// def create
// {
// post: {
//   title: "title of post"
//   body: "alot of text is put here"
//   tags: []
// }
// }

//   # <input type="text" name="post[title]" />
//   # <input type="text" name="post[body]" />

//   # Makes an array of checked ids into  "post[tag_ids]"
//   # and since we allow that throw. *AND* since Post `has_many` tags
//   # we get the `tag_ids=` method to associate tags to posts.

//   # <input type="checkbox" value="1" name="post[tag_ids][]" />
//   # <input type="checkbox" value="2" name="post[tag_ids][]" />
//   # <input type="checkbox" value="7" name="post[tag_ids][]" />

//   #    { "post" => { "title" => "Whoa!", "body" => "Nice!", "tag_ids" => [1, 2, 7] } }

//   # Make a new post, but associate it to the currently logged in Profile
//   new_post = current_profile.posts.create(post_params)

//   # Just say all is ok...
//   render head: :ok
// end
