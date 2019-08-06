<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-icon
          large
          color="primary"
          :disabled="canViewRateHistory"
          @click.prevent="viewRateHistory"
          v-on="on"
          >pageview</v-icon
        >
      </template>
      <span>View Rate History</span>
    </v-tooltip>

    <v-dialog v-model="show" persistent width="1000">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          {{ cardTitle }}
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="rate_history"
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td>{{ props.item.rate }}</td>
              <td>{{ props.item.from }}</td>
              <td>{{ props.item.to }}</td>
            </template>
          </v-data-table>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="show = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      show: false,
      headers: [
        {
          text: 'Rate',
          align: 'left',
          value: 'rate'
        },
        { text: 'From', align: 'left', value: 'from' },
        { text: 'To', align: 'left', value: 'to' }
      ],
      rate_history: []
    }
  },
  computed: {
    ...mapGetters({
      employee: 'employees/employee'
    }),
    cardTitle() {
      const employee = this.employee

      if (_.isEmpty(employee)) return

      return (
        employee.firstname + ' ' + employee.lastname + "'s - " + 'Rate history'
      )
    },
    canViewRateHistory() {
      return this.$route.params.id === undefined
    }
  },
  methods: {
    async viewRateHistory() {
      const loading = this.$loading.show()
      try {
        const response = await this.$axios.$get(
          `employee/rate-histories/${this.$route.params.id}`
        )
        this.rate_history = response.data
        this.show = true
        loading.hide()
      } catch (error) {}
    }
  }
}
</script>

<style></style>
