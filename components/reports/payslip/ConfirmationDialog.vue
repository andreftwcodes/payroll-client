<template>
  <v-dialog v-model="show" persistent width="500">
    <v-card>
      <v-card-title class="headline grey lighten-2">
        Confirmation
      </v-card-title>
      <v-card-text class="subheading">
        Do you want to close the period?
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click.prevent="onClosePeriod">
          Confirm
        </v-btn>
        <v-btn color="primary" flat @click="show = false">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean
    },
    filterParams: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  computed: {
    show: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    async onClosePeriod() {
      this.show = false
      try {
        const response = await this.$axios.$post(
          `payslip/close-period/${this.filterParams.employee_id}`,
          this.filterParams
        )
        this.$emit('closed:period', response.data)
      } catch (error) {}
    }
  }
}
</script>

<style></style>
