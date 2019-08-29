export const state = () => ({
  selected_date: null
})

export const getters = {
  selected_date(state) {
    return state.selected_date
  }
}

export const mutations = {
  SET_SELECTED_DATE(state, date) {
    state.selected_date = date
  }
}

export const actions = {
  setSelectedDate({ commit }, date) {
    commit('SET_SELECTED_DATE', date)
  }
}
