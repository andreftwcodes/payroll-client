<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-card>
          <v-card-title>
            <v-flex md4>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-flex>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="payroll_periods"
            :rows-per-page-items="rowsPerPage"
            :search="search"
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td>
                {{ props.item.period_dsp }}
              </td>
              <td>{{ props.item.employee.fullname }}</td>
              <td>{{ props.item.created_at }}</td>
              <td>
                <v-icon
                  class="mr-3"
                  color="blue darken-2"
                  @click="onShowPaySlip(props.item)"
                  >receipt</v-icon
                >
                <v-icon color="green" @click="onOpenPeriod(props.item)"
                  >lock_open</v-icon
                >
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
      <OpenPeriodDialog
        v-model="opd"
        :payroll="payroll"
        @opened:period="openedPeriod"
      />
    </v-layout>
  </v-container>
</template>

<script>
import _ from 'lodash'
import OpenPeriodDialog from '@/components/payroll-periods/OpenPeriodDialog'
export default {
  components: {
    OpenPeriodDialog
  },
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Period',
          align: 'left',
          sortable: false,
          value: 'period_dsp'
        },
        {
          text: 'Fullname',
          align: 'left',
          sortable: false,
          value: 'employee.fullname'
        },
        {
          text: 'Created at',
          align: 'left',
          sortable: false,
          value: 'created_at'
        },
        {
          text: '',
          align: 'left',
          sortable: false,
          value: ''
        }
      ],
      rowsPerPage: [10, 15, 20],
      opd: false,
      payroll: {}
    }
  },
  async asyncData({ app }) {
    const response = await app.$axios.$get('payroll-periods')
    return {
      payroll_periods: response.data
    }
  },
  methods: {
    onShowPaySlip(payroll) {
      console.log(payroll)
    },
    onOpenPeriod(payroll) {
      this.opd = true
      this.payroll = payroll
    },
    openedPeriod(id) {
      const indexOfItem = _.findIndex(this.payroll_periods, ['id', id])
      this.payroll_periods.splice(indexOfItem, 1)
    }
  }
}
</script>

<style></style>
