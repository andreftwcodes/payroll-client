export const state = () => ({
  loan: {}
})

export const getters = {
  loan(state) {
    return state.loan
  }
}

export const mutations = {
  SET_LOAN(state, loan) {
    state.loan = loan
  }
}

export const actions = {
  setLoan({ commit }, loan) {
    commit('SET_LOAN', loan)
  },
  clearLoan({ dispatch }) {
    dispatch('setLoan', {})
  }
}
