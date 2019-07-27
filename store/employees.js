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
      payment_period: extras.payment_period
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
    dispatch('attachRate', response.data)
    dispatch('attachDeductions', response.data)
    dispatch('attachOther', response.data)
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
  async attachRate({ state }, employee) {
    await this.$axios.$post(`employee/rate/${employee.id}`, state.extras)
  },
  async attachDeductions({ state }, employee) {
    await this.$axios.$post(`employee/deductions/${employee.id}`, state.extras)
  },
  async attachOther({ state }, employee) {
    await this.$axios.$post(`employee/other/${employee.id}`, state.extras.other)
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
