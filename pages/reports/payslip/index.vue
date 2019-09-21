<template>
  <v-container fluid grid-list-xl>
    <v-layout>
      <v-flex>
        <ToolBar />
        <FilterDialog />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ToolBar from '@/components/reports/payslip/ToolBar'
import FilterDialog from '@/components/reports/payslip/FilterDialog'
export default {
  components: {
    ToolBar,
    FilterDialog
  },
  data() {
    return {}
  }
}
</script>

<style></style>
