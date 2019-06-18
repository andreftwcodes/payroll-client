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
            <ContributionTable
              class="mt-3"
              :contributions="contributions"
              :tabs="tabs"
            />
          </v-flex>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ContributionTable from '@/components/settings/deductions/partials/ContributionTable'
export default {
  components: {
    ContributionTable
  },
  data() {
    return {
      tabs: null,
      contributions: []
    }
  },
  watch: {
    tabs: function(newValue, oldValue) {
      this.getContributions(newValue)
    }
  },
  created() {
    this.getContributions()
  },
  methods: {
    async getContributions(flag = 'sss') {
      const loading = this.$loading.show()
      try {
        const response = await this.$axios.$get('hdr-contributions', {
          params: {
            flag: flag
          }
        })
        this.contributions = response.data
        loading.hide()
      } catch (error) {}
    }
  }
}
</script>

<style></style>
