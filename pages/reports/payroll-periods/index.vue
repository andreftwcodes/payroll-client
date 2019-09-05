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
            <v-flex md2>
              <v-dialog
                ref="dialog"
                v-model="yearMonthPicker"
                :return-value.sync="year_month"
                persistent
                lazy
                full-width
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    :value="yearMonthDateFormatted"
                    label="Filter by Year and Month"
                    append-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="year_month"
                  :max="_now()"
                  type="month"
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="yearMonthPicker = false"
                    >Cancel</v-btn
                  >
                  <v-btn flat color="primary" @click="onPickedYearMonth($refs)"
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-dialog>
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
import moment from 'moment'
import { payslipMixin } from '@/plugins/mixins/payslip.js'
import OpenPeriodDialog from '@/components/payroll-periods/OpenPeriodDialog'
export default {
  components: {
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
      opd: false,
      payroll: {}
    }
  },
  computed: {
    yearMonthDateFormatted() {
      return this.year_month ? moment(this.year_month).format('MMMM YYYY') : ''
    }
  },
  async asyncData({ app }) {
    const response = await app.$axios.$get('payroll-periods')
    return {
      payroll_periods: response.data
    }
  },
  methods: {
    async onPickedYearMonth(refs) {
      refs.dialog.save(this.year_month)
      const loading = this.$loading.show()
      try {
        const response = await this.$axios.$get('payroll-periods', {
          params: {
            year_month: this.year_month
          }
        })
        loading.hide()
        this.payroll_periods = response.data
      } catch (error) {}
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
