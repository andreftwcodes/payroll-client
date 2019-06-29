export const state = () => ({
  flags: {}
})

export const getters = {
  flags(state) {
    return state.flags
  }
}

export const mutations = {
  SET_FLAGS(state, flags) {
    state.flags = flags
  }
}

export const actions = {
  setFlags({ commit }, flags) {
    commit('SET_FLAGS', flags)
  }
}
