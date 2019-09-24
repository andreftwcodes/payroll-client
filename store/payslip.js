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
  payslip: {}
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
  }
}
