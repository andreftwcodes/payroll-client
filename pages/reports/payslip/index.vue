<template>
  <v-container fluid grid-list-xl>
    <v-layout>
      <v-flex xs12 md3>
        <v-card>
          <FilterPaySlip
            :employees="employees"
            :can-print="canPrint"
            @pickup:payslip="pickUpPaySlip"
            @show:popup-payslip="onPrint"
          />
        </v-card>
      </v-flex>
      <v-flex xs12 md9>
        <v-card>
          <v-flex xs12>
            <template v-if="showTable">
              <PaySlipTable :payslip="payslip" />
            </template>
            <template v-else>
              <h1 class="text-md-center">Pay Slip Not Available</h1>
            </template>
          </v-flex>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import FilterPaySlip from '@/components/reports/payslip/FilterPaySlip'
import PaySlipTable from '@/components/reports/payslip/PaySlipTable'
export default {
  middleware: 'auth',
  components: {
    FilterPaySlip,
    PaySlipTable
  },
  data() {
    return {
      employees: [],
      showTable: false,
      canPrint: false,
      payslip: {},
      extra: {}
    }
  },
  async asyncData({ app }) {
    const response = await app.$axios.$get('/reports/payslip/data')
    return {
      employees: response.data
    }
  },
  methods: {
    onPrint() {
      this.popupDialog(this.extra.print_url)
    },
    popupDialog(url = '', title = 'xtf', w = 1200, h = 600) {
      const dualScreenLeft =
        window.screenLeft !== undefined ? window.screenLeft : screen.left
      const dualScreenTop =
        window.screenTop !== undefined ? window.screenTop : screen.top

      const width = window.innerWidth
        ? window.innerWidth
        : document.documentElement.clientWidth
        ? document.documentElement.clientWidth
        : screen.width
      const height = window.innerHeight
        ? window.innerHeight
        : document.documentElement.clientHeight
        ? document.documentElement.clientHeight
        : screen.height

      const left = width / 2 - w / 2 + dualScreenLeft
      const top = height / 2 - h / 2 + dualScreenTop
      window.open(
        url,
        title,
        'directories=no,toolbar=0,location=0,menubar=0,scrollbars=yes, width=' +
          w +
          ', height=' +
          h +
          ', top=' +
          top +
          ', left=' +
          left
      )
    },
    async pickUpPaySlip(item) {
      const loading = this.$loading.show()
      try {
        const response = await this.$axios.$get(
          `/payslip/period/${item.employee_id}`,
          {
            params: {
              from: item.dateFrom,
              to: item.dateTo
            }
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
