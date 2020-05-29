export const getters = {
  authenticated(state) {
    return state.loggedIn
  },
  user(state) {
    return state.user
  }
}

export const actions = {
  async logout() {
    await this.$auth.logout()
  }
}
