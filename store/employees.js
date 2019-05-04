import _ from 'lodash'

export const state = () => ({
  employee: {},
  extras: {}
})

export const getters = {
  employee(state) {
    return state.employee
  }
}

export const mutations = {
  SET_EMPLOYEE(state, employee) {
    state.employee = employee
  },
  SET_EMPLOYMENT_DETAILS(state, extras) {
    state.employee = _.merge(state.employee, { locale_id: extras.locale })
    state.extras = extras
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

    dispatch('attachRate', response.data)
    dispatch('attachDeductions', response.data)
    dispatch('attachSchedule', response.data)
    dispatch('attachOther', response.data)

    commit('SET_EMPLOYEE', {})
    commit('SET_EMPLOYMENT_DETAILS', {})
    this.$router.push({
      path: '/employees'
    })
  },
  async attachRate({ state }, employee) {
    await this.$axios.$post(`employee/rate/${employee.id}`, state.extras)
  },
  async attachDeductions({ state }, employee) {
    await this.$axios.$post(`employee/deductions/${employee.id}`, state.extras)
  },
  async attachSchedule({ state }, employee) {
    await this.$axios.$post(
      `employee/schedule/${employee.id}`,
      state.extras.schedule
    )
  },
  async attachOther({ state }, employee) {
    await this.$axios.$post(`employee/other/${employee.id}`, state.extras.other)
  }
}
