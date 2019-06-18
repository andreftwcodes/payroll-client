<template>
  <v-container fluid grid-list-xl>
    <v-layout>
      <v-flex xs12 md4>
        <v-card>
          <v-flex xs12>
            <h1>Hello World</h1>
          </v-flex>
        </v-card>
      </v-flex>
      <v-flex xs12 md8>
        <v-card>
          <v-flex xs12>
            <v-tabs v-model="tabs" fixed-tabs>
              <v-tab href="#sss">SSS</v-tab>
              <v-tab href="#pagibig">PagIbig</v-tab>
              <v-tab href="#philhealth">PhilHealth</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tabs" class="white">
              <v-tab-item value="sss" class="mt-3">
                <ContributionTable :contributions="contributions" />
              </v-tab-item>
              <v-tab-item value="pagibig" class="mt-3">
                <ContributionTable :contributions="contributions" />
              </v-tab-item>
              <v-tab-item value="philhealth" class="mt-3">
                <ContributionTable :contributions="contributions" />
              </v-tab-item>
            </v-tabs-items>
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
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',

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
