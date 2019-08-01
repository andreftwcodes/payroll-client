<template>
  <div>
    <v-form @submit.prevent="FinishDialogVisibility = true">
      <v-container fluid grid-list-md text-xs-center>
        <v-layout row wrap>
          <h1>Finish</h1>
        </v-layout>
      </v-container>
      <v-layout row wrap>
        <slot name="buttons"></slot>
      </v-layout>
    </v-form>
    <FinishDialog v-model="FinishDialogVisibility" />
  </div>
</template>

<script>
import FinishDialog from '@/components/employees/partials/FinishDialog'
export default {
  components: {
    FinishDialog
  },
  data() {
    return {
      FinishDialogVisibility: false
    }
  }
}
</script>

<style></style>
