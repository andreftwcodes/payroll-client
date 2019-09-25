export const state = () => ({
  print_button: true,
  filter_dialog: false,
  payment_period_items: [
    {
      value: 'all',
      text: 'All'
    },
    {
      value: 'weekly',
      text: 'Weekly'
    },
    {
      value: 'monthly',
      text: 'Monthly'
    }
  ],
  disabled: false,
  payslip: {},
  close_period_dialog: false,
  data_filters: {}
})

export const getters = {
  print_button(state) {
    return state.print_button
  },
  filter_dialog(state) {
    return state.filter_dialog
  },
  payment_period_items(state) {
    return state.payment_period_items
  },
  disabled(state) {
    return state.disabled
  },
  payslip(state) {
    return state.payslip
  },
  close_period_dialog(state) {
    return state.close_period_dialog
  },
  data_filters(state) {
    return state.data_filters
  }
}

export const mutations = {
  PRINT_BUTTON(state, payload) {
    state.print_button = payload
  },
  FILTER_DIALOG(state, payload) {
    state.filter_dialog = payload
  },
  DISABLED(state, payload) {
    state.disabled = payload
  },
  PAYSLIP(state, payload) {
    state.payslip = payload
  },
  CLOSE_PERIOD_DIALOG(state, payload) {
    state.close_period_dialog = payload
  },
  DATA_FILTERS(state, payload) {
    state.data_filters = payload
  }
}

export const actions = {
  printButton({ commit }, payload) {
    commit('PRINT_BUTTON', payload)
  },
  filterDialog({ commit }, payload) {
    commit('FILTER_DIALOG', payload)
  },
  disabled({ commit }, payload) {
    commit('DISABLED', payload)
  },
  setPaySlip({ commit }, payload) {
    commit('PAYSLIP', payload)
  },
  closePeriodDialog({ commit }, payload) {
    commit('CLOSE_PERIOD_DIALOG', payload)
  },
  setDataFilters({ commit }, payload) {
    commit('DATA_FILTERS', payload)
  }
}
