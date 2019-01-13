import axios from 'axios'
import { decorate, observable } from 'mobx'

class DataStore {
  constructor() {
    this.profile = {
      posts: [],
      interested_posts: [],
      tags: []
    }
    this.singlePost = {}
    this.AllTags = []
    this.showOrHide = 'hidden'
  }
  changeShowOrHide = () => {
    this.showOrHide = !this.showOrHide ? 'hidden' : ''
  }
  getProfileData = () => {
    axios.get(`/api/profiles/1`).then(response => {
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
    axios.get(`/api/posts/${theCommentID}`).then(response => {
      console.log(response.data.post)
      this.singlePost = response.data.post
    })

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
  AllTags: observable,
  showOrHide: observable,
  singlePost: observable
})

let myDataStore = new DataStore()
export default myDataStore
