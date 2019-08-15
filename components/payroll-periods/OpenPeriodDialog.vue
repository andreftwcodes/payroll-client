<template>
  <v-dialog v-model="show" persistent width="500">
    <v-card>
      <v-card-title class="headline grey lighten-2">
        Confirmation
      </v-card-title>
      <v-card-text class="subheading">
        <strong>{{ payroll.period_dsp }}</strong
        >. Do you really want to open this period?
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click.prevent="onConfirmOpenPeriod">
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
    payroll: {
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
    async onConfirmOpenPeriod() {
      try {
        await this.$axios.$delete(`payroll-periods/${this.payroll.id}`)
        this.show = false
        this.$emit('opened:period', this.payroll.id)
      } catch (error) {}
    }
  }
}
</script>

<style></style>
