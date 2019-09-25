<template>
  <v-toolbar dense>
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
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      print_button: 'payslip/print_button'
    })
  },
  methods: {
    ...mapActions({
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
