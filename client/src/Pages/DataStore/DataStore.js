import axios from 'axios'
import { observer } from 'mobx-react'
import { decorate, computed, observable } from 'mobx'

class DataStore {
  constructor() {
    this.profile = {
      posts: [],
      interested_posts: [],
      tags: []
    }
  }
  getProfileData = () => {
    axios.get(`/api/profiles/1`).then(response => {
      this.profile = response.data.profile
    })
  }
}

decorate(DataStore, {
  profile: observable
})

let myDataStore = new DataStore()
export default myDataStore
