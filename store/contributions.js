import _ from 'lodash'

export const state = () => ({
  ranges: [],
  contributions: []
})

export const getters = {
  ranges(state) {
    return state.ranges
  },
  contributions(state) {
    return state.contributions
  }
}

export const mutations = {
  SET_RANGES(state, ranges) {
    state.ranges = ranges
  },
  SET_CONTRIBUTIONS(state, contributions) {
    state.contributions = contributions
  },
  UPDATE_STATUS_TO_INACTIVE(state, contribution) {
    if (contribution.status_display === 'Active') {
      const filtered = _.filter(state.contributions, {
        flag: contribution.flag
      })

      state.contributions = _.map(filtered, o => {
        o.status_display = 'Inactive'
        return o
      })
    }
  },
  APPEND_CONTRIBUTION(state, contribution) {
    state.contributions.unshift(contribution)
  },
  UPDATE_CONTRIBUTION(state, contribution) {
    state.contributions.splice(
      _.findIndex(state.contributions, o => o.id === contribution.id),
      1,
      contribution
    )
  }
}

export const actions = {
  setRanges({ commit }, ranges) {
    commit('SET_RANGES', ranges)
  },
  appendContribution({ commit }, contribution) {
    commit('UPDATE_STATUS_TO_INACTIVE', contribution)
    commit('APPEND_CONTRIBUTION', contribution)
  },
  updateContribution({ commit }, contribution) {
    commit('UPDATE_STATUS_TO_INACTIVE', contribution)
    commit('UPDATE_CONTRIBUTION', contribution)
  }
}
