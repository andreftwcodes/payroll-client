<template>
  <v-container fluid grid-list-xl>
    <v-layout>
      <v-flex>
        <ToolBar />
        <FilterDialog />
        <PaySlipTable />
        <ConfirmationDialog />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ToolBar from '@/components/reports/payslip/ToolBar'
import FilterDialog from '@/components/reports/payslip/FilterDialog'
import PaySlipTable from '@/components/reports/payslip/PaySlipTable'
import ConfirmationDialog from '@/components/reports/payslip/ConfirmationDialog'
import { mapActions } from 'vuex'
export default {
  middleware: 'auth',
  components: {
    ToolBar,
    FilterDialog,
    PaySlipTable,
    ConfirmationDialog
  },
  data() {
    return {}
  },
  mounted() {
    this.$nextTick(function() {
      this.setPaySlip({})
    })
  },
  methods: {
    ...mapActions({
      setPaySlip: 'payslip/setPaySlip'
    })
  }
}
</script>

<style></style>
