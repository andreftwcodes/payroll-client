import _ from 'lodash'

export const state = () => ({
  employee: {},
  extras: {}
})

export const getters = {
  employee(state) {
    return state.employee
  },
  extras(state) {
    return state.extras
  }
}

export const mutations = {
  SET_EMPLOYEE(state, employee) {
    state.employee = employee
  },
  SET_EMPLOYMENT_DETAILS(state, extras) {
    state.employee = _.merge(state.employee, {
      locale_id: extras.locale,
      rate: extras.rate,
      payment_period: extras.payment_period,
      hired_at: extras.hired_at
    })
    state.extras = extras
  },
  SET_SCHEDULING(state, schedules) {
    state.extras = _.merge(state.extras, {
      schedules: schedules
    })
  }
}

export const actions = {
  async saveEmployee({ commit, state, dispatch }) {
    let response = {}
    if (state.employee.id === null) {
      response = await this.$axios.$post('employees', state.employee)
    } else {
      response = await this.$axios.$patch(
        `employees/${state.employee.id}`,
        state.employee
      )
    }

    dispatch('attachSchedules', response.data)
    dispatch('attachOther', response.data)
    dispatch('attachRateHistory', response.data)
    dispatch('attachLedger', response.data)
    dispatch('updateAttendanceAttributes', response.data)

    commit('SET_EMPLOYEE', {})
    commit('SET_EMPLOYMENT_DETAILS', {})
    commit('SET_SCHEDULING', {})
    this.$router.push({
      path: '/employees'
    })
  },
  async attachSchedules({ state }, employee) {
    await this.$axios.$post(`employee/schedules/${employee.id}`, {
      schedules: state.extras.schedules
    })
  },
  async attachOther({ state }, employee) {
    await this.$axios.$post(`employee/other/${employee.id}`, state.extras.other)
  },
  async attachRateHistory({ state }, employee) {
    await this.$axios.$post(`employee/rate-history/${employee.id}`, {
      rate: state.employee.rate
    })
  },
  async attachLedger({ state }, employee) {
    await this.$axios.$post(`cash-advance/attach_ledger/${employee.id}`)
  },
  async updateAttendanceAttributes({ state }, employee) {
    await this.$axios.$patch(`employee/attendance/attributes/${employee.id}`, {
      amount: state.extras.rate,
      schedules: state.extras.schedules,
      night_shift: state.extras.other.night_shift,
      overtime: state.extras.other.overtime
    })
  }
}
