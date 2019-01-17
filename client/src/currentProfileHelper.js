const CurrentProfileHelper = (current_profile, id) => {
  if (current_profile) {
    console.log('current profile')
    console.log('t or f?')
    console.log(current_profile)
    return `/Profile`
  } else {
    console.log('other user profile')
    console.log('t or f?')
    console.log(current_profile)
    return `/Profile/${id}`
  }

  // will return id after condition is met
  // return image || defaultImage
}

export default CurrentProfileHelper
