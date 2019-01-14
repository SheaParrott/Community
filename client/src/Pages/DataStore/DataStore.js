import axios from 'axios'
import { decorate, observable } from 'mobx'
import { toJS } from 'mobx'

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
    // this will be the recommended or interested posts show when
    // 'see more' is clicked and posts component is loaded
    this.RecommendedOrInterested = []
    this.PostWithComments = 'hidden'
    this.CommentLogo = ''
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
    // console.log(theProfileID)

    axios.get(`/api/profiles/${theProfileID}`).then(response => {
      console.log(response.data.profile)
      this.profile = response.data.profile
    })
  }
  getOnePost = theCommentID => {
    // console.log(theCommentID)

    axios.get(`/api/posts/${theCommentID}`).then(response => {
      // console.log(response.data.post)
      this.singlePost = response.data.post
    })
  }
  getAllRecommendedPosts = () => {
    // console.log('clicked mydatastore recommended posts')
    // console.log(toJS(this.profile.recommeded_posts))
    // function that gets all recommeded posts and changes
    //  the variable RecommendedOrInterested
  }
  getAllInterestedPosts = () => {
    // console.log(toJS(this.profile.interested_posts))
    this.RecommendedOrInterested = toJS(this.profile.interested_posts)
    // function that gets all interested posts and changes
    //  the variable RecommendedOrInterested
  }
  ShowOrHidePostWithComment = () => {
    // this will hide the comment logo and show the comments
    // need a the check params for when on postWithComments
    // component
    this.CommentLogo = !this.showOrHide ? 'hidden' : ''
    this.PostWithComments = !this.showOrHide ? '' : 'hidden'
  }
}

decorate(DataStore, {
  profile: observable,
  AllTags: observable,
  showOrHide: observable,
  singlePost: observable,
  PostOptions: observable,
  PostWithComments: observable,
  CommentLogo: observable
})

let myDataStore = new DataStore()
export default myDataStore
