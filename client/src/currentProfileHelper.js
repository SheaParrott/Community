const CurrentProfileHelper = (current_profile, id) => {
  if (current_profile) {
    return `/Profile`
  } else {
    return `/Profile/${id}`
  }
}

export default CurrentProfileHelper
