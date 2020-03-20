<template>
  <v-dialog v-model="close_period_dialog" persistent width="500">
    <v-card>
      <v-card-title class="headline grey lighten-2">
        Confirmation
      </v-card-title>
      <v-card-text class="subheading">
        Do you want to close this period ?
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="disabled"
          :loading="loading_confirm"
          color="primary"
          flat
          @click.prevent="onClosePeriod"
        >
          Confirm
        </v-btn>
        <v-btn :disabled="disabled" color="primary" flat @click="onCancel">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { payslipMixin } from '@/plugins/mixins/payslip.js'
export default {
  mixins: [payslipMixin],
  data() {
    return {
      disabled: false,
      loading_confirm: false
    }
  },
  computed: {
    ...mapGetters({
      payslip: 'payslip/payslip',
      close_period_dialog: 'payslip/close_period_dialog',
      data_filters: 'payslip/data_filters'
    })
  },
  methods: {
    ...mapActions({
      setPaySlip: 'payslip/setPaySlip',
      printButton: 'payslip/printButton',
      closePeriodDialog: 'payslip/closePeriodDialog'
    }),
    onCancel() {
      this.closePeriodDialog(false)
    },
    async onClosePeriod() {
      try {
        this.disabled = true
        this.loading_confirm = true
        await this.$axios.$post(
          `payslip/close-period/${this.data_filters.employee_id}`,
          this.data_filters
        )
        this.disabled = false
        this.loading_confirm = false
        this.payslipDialog(this.payslip.extra.print_url)
        this.setPaySlip({})
        this.printButton(true)
        this.closePeriodDialog(false)
      } catch (error) {
        this.disabled = false
        this.loading_confirm = false
      }
    }
  }
}
</script>

<style></style>
