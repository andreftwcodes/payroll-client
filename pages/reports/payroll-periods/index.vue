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
            <v-spacer></v-spacer>
            <v-icon medium color="blue darken-2" @click.prevent="onShowFilters"
              >settings_input_component</v-icon
            >
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
              <td>{{ props.item.employee.locale.name }}</td>
              <td>{{ props.item.created_at }}</td>
              <td>
                <v-icon
                  class="mr-3"
                  color="blue darken-2"
                  @click="onShowPaySlip(props.item.print_url)"
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
      <FilterDialog v-model="filterDialog" @on:filter="applyFilters" />
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
import { payslipMixin } from '@/plugins/mixins/payslip.js'
import FilterDialog from '@/components/payroll-periods/FilterDialog'
import OpenPeriodDialog from '@/components/payroll-periods/OpenPeriodDialog'
export default {
  components: {
    FilterDialog,
    OpenPeriodDialog
  },
  mixins: [payslipMixin],
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
          text: 'Locale',
          align: 'left',
          sortable: false,
          value: 'employee.locale.name'
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
      yearMonthPicker: false,
      year_month: this._now(),
      filterDialog: false,
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
    async applyFilters(filters) {
      const loading = this.$loading.show()
      try {
        const response = await this.$axios.$get('payroll-periods', {
          params: filters
        })
        loading.hide()
        this.payroll_periods = response.data
      } catch (error) {}
    },
    onShowFilters() {
      this.filterDialog = true
    },
    onShowPaySlip(url) {
      this.payslipDialog(url)
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
