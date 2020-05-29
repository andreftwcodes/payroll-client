<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-card>
          <v-card-text>
            <h1 class="display-3 text-md-center">
              Attendance Report Coming Soon.
            </h1>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { payslipMixin } from '@/plugins/mixins/payslip.js'
export default {
  middleware: 'auth',
  components: {},
  mixins: [payslipMixin],
  data() {
    return {}
  },
  async asyncData({ app }) {},
  methods: {}
}
</script>

<style></style>
