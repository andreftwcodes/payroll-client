<template>
  <div v-if="isNotEmptyPaySlip" class="v-table__overflow mt-3">
    <table class="v-datatable v-table theme--light">
      <tbody>
        <tr>
          <td colspan="2" class="td__name">
            <strong>Name:</strong> {{ payslip.data.fullname }}
          </td>
          <td colspan="2" class="td__date text-xs-right">
            <strong>Date:</strong> {{ payslip.data.date_issued }}
          </td>
        </tr>
        <tr>
          <td colspan="4">
            <strong>Period:</strong> {{ payslip.data.period }}
          </td>
        </tr>
        <tr>
          <td><strong>Basic Rate</strong></td>
          <td style="border-top-style: hidden;"></td>
          <td style="border-top-style: hidden;" class="text-xs-right">
            <strong>{{ payslip.data.basic_rate }}</strong>
          </td>
          <td style="border-top-style: hidden;"></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td><strong>Overtime | Hours</strong></td>
          <td class="text-xs-right">
            {{ payslip.data.overtime.hours }}
          </td>
          <td class="text-xs-right">
            {{ payslip.data.overtime.amount }}
          </td>
          <td></td>
        </tr>
        <tr>
          <td><strong>Undertime | Hours</strong></td>
          <td class="text-xs-right">- {{ payslip.data.undertime.hours }}</td>
          <td class="text-xs-right">- {{ payslip.data.undertime.amount }}</td>
          <td></td>
        </tr>
        <tr>
          <td><strong>GROSS SALARY</strong></td>
          <td></td>
          <td></td>
          <td class="text-xs-right">
            <strong>{{ payslip.data.gross_pay }}</strong>
          </td>
        </tr>
        <tr>
          <td><strong>Less</strong></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr v-for="(item, index) in payslip.data.less" :key="index">
          <td class="pl-5">{{ item.name }}</td>
          <td></td>
          <td class="text-xs-right">{{ item.amount }}</td>
          <td></td>
        </tr>
        <tr>
          <td><strong>Total Deductions</strong></td>
          <td></td>
          <td></td>
          <td class="text-xs-right">
            <strong>{{ payslip.data.total_deductions }}</strong>
          </td>
        </tr>
        <tr>
          <td><strong>Take Home Pay</strong></td>
          <td></td>
          <td></td>
          <td class="text-xs-right">
            <strong>{{ payslip.data.net_pay }}</strong>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      payslip: 'payslip/payslip'
    }),
    isNotEmptyPaySlip() {
      return !_.isEmpty(this.payslip)
    }
  }
}
</script>

<style scoped>
table,
th,
td {
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-collapse: collapse;
}

table.v-table tbody td,
table.v-table tbody th {
  height: 35px;
}

.td__name {
  border-bottom-style: hidden;
}

.td__date {
  border-left: hidden;
  border-bottom-style: hidden;
}
</style>
