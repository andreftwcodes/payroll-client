export const state = () => ({
  disabled: true,
  roles: [],
  schedules: [],
  locales: [],
  edit: false,
  systemTheme: []
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
  schedules(state) {
    return state.schedules
  },
  edit(state) {
    return state.edit
  },
  system_theme(state) {
    return state.systemTheme
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
  SET_LOCALES(state, locales) {
    state.locales = locales
  },
  SET_SCHEDULES(state, schedules) {
    state.schedules = schedules
  },
  IS_EDIT(state, edit) {
    state.edit = edit
  },
  SET_SYSTEM_THEME(state, systemTheme) {
    state.systemTheme = systemTheme
  }
}

export const actions = {
  async nuxtServerInit({ commit, dispatch }) {
    commit(
      'SET_SYSTEM_THEME',
      (await this.$axios.$get('system-theme/theme-data')).data
    )
    commit('SET_ROLES', (await this.$axios.$get('roles')).data)
    commit('SET_LOCALES', (await this.$axios.$get('locales')).data)
    commit(
      'SET_SCHEDULES',
      (await this.$axios.$get('employee/dropdown-schedules')).data
    )
  }
}
