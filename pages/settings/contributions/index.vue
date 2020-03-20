<template>
  <v-container fluid grid-list-xl>
    <v-layout>
      <v-flex xs12 md12>
        <v-card>
          <v-flex xs12>
            <v-tabs v-model="tabs" fixed-tabs>
              <v-tab href="#sss">SSS</v-tab>
              <v-tab href="#pagibig">PagIbig</v-tab>
              <v-tab href="#philhealth">PhilHealth</v-tab>
            </v-tabs>
            <template v-if="isRangesEmpty">
              <ContributionTable
                :contributions="contributions"
                :tabs="tabs"
                class="mt-3"
              />
            </template>
            <template v-else>
              <TableRanges class="mt-3" />
            </template>
          </v-flex>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import _ from 'lodash'
import { mapGetters, mapMutations } from 'vuex'
import ContributionTable from '@/components/settings/contributions/partials/ContributionTable'
import TableRanges from '@/components/settings/contributions/partials/TableRanges'
export default {
  components: {
    ContributionTable,
    TableRanges
  },
  data() {
    return {
      tabs: 'sss'
    }
  },
  computed: {
    ...mapGetters({
      ranges: 'contributions/ranges',
      contributions: 'contributions/contributions'
    }),
    isRangesEmpty() {
      return _.isEmpty(this.ranges)
    }
  },
  watch: {
    tabs: function(newValue, oldValue) {
      this.getContributions(newValue)
    }
  },
  mounted() {
    this.getContributions()
  },
  methods: {
    ...mapMutations({
      setContributions: 'contributions/SET_CONTRIBUTIONS'
    }),
    async getContributions(flag = 'sss') {
      const loading = this.$loading.show()
      try {
        const response = await this.$axios.$get('hdr-contributions', {
          params: {
            flag: flag
          }
        })
        loading.hide()
        this.setContributions(response.data)
      } catch (error) {}
    }
  }
}
</script>
