import axios from 'axios'
import { decorate, observable } from 'mobx'

class DataStore {
  constructor() {
    this.profile = {
      posts: [],
      interested_posts: [],
      tags: []
    }
    this.singlePost = {
      comments: []
    }
    this.AllTags = []
    this.showOrHide = 'hidden'
    this.PostOptions = 'hidden'
  }
  changeShowOrHide = () => {
    this.showOrHide = !this.showOrHide ? 'hidden' : ''
  }
  showOrHidePostOptions = () => {
    this.PostOptions = !this.PostOptions ? 'hidden' : ''
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

  getOneProfile = theProfileID => {
    console.log(theProfileID)

    axios.get(`/api/profiles/${theProfileID}`).then(response => {
      console.log(response.data.profile)
      this.profile = response.data.profile
    })
  }
  getOnePost = theCommentID => {
    // console.log(theCommentID)

    axios.get(`/api/posts/${theCommentID}`).then(response => {
      console.log(response.data.post)
      this.singlePost = response.data.post
    })
  }
}

decorate(DataStore, {
  profile: observable,
  AllTags: observable,
  showOrHide: observable,
  singlePost: observable,
  PostOptions: observable
})

let myDataStore = new DataStore()
export default myDataStore
