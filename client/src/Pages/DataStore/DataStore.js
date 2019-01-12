import axios from 'axios'
import { decorate, computed, observable } from 'mobx'

class DataStore {
  constructor() {
    this.profile = {
      posts: [],
      interested_posts: [],
      tags: []
    }
    this.post = {}
    this.AllTags = []
  }
  getProfileData = () => {
    axios.get(`/api/profiles/2`).then(response => {
      this.profile = response.data.profile
    })
  }
  getAllTags = () => {
    axios.get(`/api/tags`).then(response => {
      this.AllTags = response.data.tags
      // console.log(response.data.tags)
    })
  }
  commentID = theCommentID => {
    console.log(theCommentID)
    // now get single post with comments and pass
    // to post with comment section. create a new observable
    // for postWithComment component

    // data needed from api
    // - profile pic
    // - profile name
    // - post.created
    // - post.title
    // - post.image
    // - post.body

    // post comments
    // - profile.image
    // - profile.name
    // - comment.body

    //might need a internal function to pass the event
    //data then pass that data to a function call here
  }
}

decorate(DataStore, {
  profile: observable,
  AllTags: observable
})

let myDataStore = new DataStore()
export default myDataStore
