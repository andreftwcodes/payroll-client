import _ from 'lodash'

export const state = () => ({
  disabled: true,
  roles: [],
  schedules: [],
  locales: [],
  employees: [],
  edit: false
})

export const getters = {
  disabled(state) {
    return state.disabled
  },
  roles(state) {
    return state.roles
  },
  locales(state) {
    return state.locales
  },
  employees(state) {
    return state.employees
  },
  schedules(state) {
    return state.schedules
  },
  edit(state) {
    return state.edit
  }
}

export const mutations = {
  EDIT(state) {
    state.disabled = !state.disabled
  },
  SET_DISABLED(state, disabled) {
    state.disabled = disabled
  },
  SET_ROLES(state, roles) {
    state.roles = roles
  },
  SET_EMPLOYEES(state, employees) {
    state.employees = employees
  },
  SET_LOCALES(state, locales) {
    state.locales = locales
  },
  SET_SCHEDULES(state, schedules) {
    state.schedules = schedules
  },
  IS_EDIT(state, edit) {
    state.edit = edit
  }
}

export const actions = {
  async nuxtServerInit({ commit, dispatch }) {
    commit('SET_ROLES', (await this.$axios.$get('roles')).data)
    commit('SET_LOCALES', (await this.$axios.$get('locales')).data)
    commit('SET_SCHEDULES', (await this.$axios.$get('schedules')).data)
    dispatch('mappedEmployees', (await this.$axios.$get('employees')).data)
  },
  mappedEmployees({ commit }, employees) {
    commit(
      'SET_EMPLOYEES',
      _.map(employees, o => {
        return {
          id: o.id,
          fullname: o.firstname + ' ' + o.lastname
        }
      })
    )
  }
}
