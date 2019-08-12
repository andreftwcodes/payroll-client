export const state = () => ({
  payment_period_loading: false,
  disabled: false,
  flags: {}
})

export const getters = {
  payment_period_loading(state) {
    return state.payment_period_loading
  },
  disabled(state) {
    return state.disabled
  },
  flags(state) {
    return state.flags
  }
}

export const mutations = {
  SET_PAYMENT_PERIOD_LOADING(state, loading) {
    state.payment_period_loading = loading
  },
  SET_DISABLED(state, disabled) {
    state.disabled = disabled
  },
  SET_FLAGS(state, flags) {
    state.flags = flags
  }
}

export const actions = {
  setPaymentPeriodLoading({ commit, dispatch }, payload) {
    dispatch('setDisabled', payload)
    commit('SET_PAYMENT_PERIOD_LOADING', payload)
  },
  setFlags({ commit }, flags) {
    commit('SET_FLAGS', flags)
  },
  setDisabled({ commit }, payload) {
    commit('SET_DISABLED', payload)
  }
}
