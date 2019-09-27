<template>
  <v-toolbar dense>
    <v-toolbar-title>Payslip</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon :disabled="print_button" @click="onPrint">print</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon @click="openDialogFilters">settings_input_component</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import _ from 'lodash'
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      payslip: 'payslip/payslip',
      print_button: 'payslip/print_button'
    })
  },
  watch: {
    payslip: function(value) {
      this.printButton(_.isEmpty(value))
    }
  },
  methods: {
    ...mapActions({
      printButton: 'payslip/printButton',
      filterDialog: 'payslip/filterDialog',
      closePeriodDialog: 'payslip/closePeriodDialog'
    }),
    onPrint() {
      this.closePeriodDialog(true)
    },
    openDialogFilters() {
      this.filterDialog(true)
    }
  }
}
</script>
