<template>
  <v-form @submit.prevent="submit">
    <v-container fluid grid-list-md text-xs-center>
      <v-layout row wrap>
        <h1>Overview</h1>
      </v-layout>
    </v-container>
    <v-layout row wrap>
      <slot name="buttons"></slot>
    </v-layout>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  methods: {
    ...mapActions({
      saveEmployee: 'employees/saveEmployee'
    }),
    submit() {
      if (confirm('Do you confirm to save?')) {
        this.saveEmployee()
      }
    }
  }
}
</script>

<style></style>
