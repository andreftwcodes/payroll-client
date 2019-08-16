<template>
  <v-container fluid grid-list-xl>
    <v-layout>
      <v-flex xs12 md3>
        <v-card>
          <v-flex xs12>
            <FilterPaySlip
              :employees="employees"
              :can-print="canPrint"
              @on-changed:payment-period="onChangedPaymentPeriod"
              @on-changed:employee="canPrint = false"
              @pickup:payslip="showDeductDialog"
              @show:popup-payslip="onPrint"
            />
          </v-flex>
        </v-card>
      </v-flex>
      <v-flex xs12 md9>
        <template v-if="showTable">
          <v-card>
            <v-flex xs12>
              <PaySlipTable :payslip="payslip" />
            </v-flex>
          </v-card>
        </template>
      </v-flex>
      <DeductDialog v-model="deductDialog" @confirm:deduct="pickUpPaySlip" />
      <ConfirmationDialog
        v-model="closePeriodConfirm"
        :filter-params="filter_params"
        @closed:period="onClosedPeriod"
      />
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import _ from 'lodash'
import { payslipMixin } from '@/plugins/mixins/payslip.js'
import FilterPaySlip from '@/components/reports/payslip/FilterPaySlip'
import PaySlipTable from '@/components/reports/payslip/PaySlipTable'
import DeductDialog from '@/components/reports/payslip/DeductDialog'
import ConfirmationDialog from '@/components/reports/payslip/ConfirmationDialog'
export default {
  components: {
    FilterPaySlip,
    PaySlipTable,
    DeductDialog,
    ConfirmationDialog
  },
  mixins: [payslipMixin],
  middleware: 'auth',
  data() {
    return {
      employees: [],
      showTable: false,
      canPrint: false,
      payslip: {},
      extra: {},
      deductDialog: false,
      closePeriodConfirm: false,
      filters: null,
      filter_params: {}
    }
  },
  async asyncData({ app }) {
    const response = await app.$axios.$get('/reports/payslip/data')
    return {
      employees: response.data
    }
  },
  methods: {
    ...mapActions({
      setPaymentPeriodLoading: 'payslip/setPaymentPeriodLoading',
      setFlags: 'payslip/setFlags'
    }),
    onPrint() {
      this.closePeriodConfirm = true
      this.filter_params = _.merge(this.filter_params, {
        employee_id: this.filters.employee_id
      })
    },
    onClosedPeriod(employee) {
      this.employees.splice(
        _.findIndex(this.employees, o => o.id === employee.id),
        1,
        employee
      )
      this.canPrint = false
      this.showTable = false
      this.payslipDialog(this.extra.print_url)
    },
    async onChangedPaymentPeriod(paymentPeriod) {
      this.canPrint = false
      try {
        const response = await this.$axios.$get('/reports/payslip/data', {
          params: {
            payment_period: paymentPeriod
          }
        })
        this.employees = response.data
        this.setPaymentPeriodLoading(false)
      } catch (error) {}
    },
    showDeductDialog(filters) {
      this.filters = filters
      this.deductDialog = true
      this.setFlags(this.extractedFlags(filters))
    },
    extractedFlags(obj) {
      return _.find(this.employees, ['id', obj.employee_id]).flags
    },
    async pickUpPaySlip(extraFilters) {
      const loading = this.$loading.show()
      this.filter_params = {
        from: this.filters.dateFrom,
        to: this.filters.dateTo,
        contributions: extraFilters.contributions,
        ca_amount_deductible: extraFilters.ca_amount_deductible,
        sss_loan_id: extraFilters.sss_loan_id
      }
      try {
        const response = await this.$axios.$get(
          `/payslip/period/${this.filters.employee_id}`,
          {
            params: this.filter_params
          }
        )
        this.payslip = response.data
        this.extra = response.extra
        this.showTable = true
        this.canPrint = true
        loading.hide()
      } catch (error) {}
    }
  }
}
</script>
