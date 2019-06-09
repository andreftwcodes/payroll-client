<template>
  <div class="v-table__overflow">
    <table class="v-datatable v-table theme--light">
      <tbody>
        <tr>
          <td colspan="2" class="td__name">
            <strong>Name:</strong> {{ payslip.fullname }}
          </td>
          <td colspan="2" class="td__date">
            <strong>Date:</strong> {{ payslip.date_issued }}
          </td>
        </tr>
        <tr>
          <td colspan="4"><strong>Period:</strong> {{ payslip.period }}</td>
        </tr>
        <tr>
          <td><strong>Basic Rate</strong></td>
          <td></td>
          <td class="text-xs-right">
            <strong>{{ payslip.basic_rate }}</strong>
          </td>
          <td></td>
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
            {{ payslip.overtime.hours }}
          </td>
          <td class="text-xs-right">
            {{ payslip.overtime.amount }}
          </td>
          <td></td>
        </tr>
        <tr>
          <td><strong>GROSS SALARY</strong></td>
          <td></td>
          <td></td>
          <td class="text-xs-right">
            <strong>{{ payslip.gross_pay }}</strong>
          </td>
        </tr>
        <tr>
          <td><strong>Less</strong></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr v-for="(item, index) in payslip.less" :key="index">
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
            <strong>{{ payslip.total_deductions }}</strong>
          </td>
        </tr>
        <tr>
          <td><strong>Take Home Pay</strong></td>
          <td></td>
          <td></td>
          <td class="text-xs-right">
            <strong>{{ payslip.net_pay }}</strong>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    payslip: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {}
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
  height: 40px;
}

.td__name {
  border-bottom-style: hidden;
}

.td__date {
  border-left: hidden;
  border-bottom-style: hidden;
}
</style>
