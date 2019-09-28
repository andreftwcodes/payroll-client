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
        <v-btn
          color="primary"
          flat
          :disabled="disabled"
          :loading="loading_btn_confirm"
          @click.prevent="onConfirmOpenPeriod"
        >
          Confirm
        </v-btn>
        <v-btn color="primary" flat :disabled="disabled" @click="show = false">
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
    return {
      disabled: false,
      loading_btn_confirm: false
    }
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
        this.disabled = true
        this.loading_btn_confirm = true
        await this.$axios.$delete(`payroll-periods/${this.payroll.id}`)
        this.show = false
        this.disabled = false
        this.loading_btn_confirm = false
        this.$emit('opened:period', this.payroll.id)
      } catch (error) {
        this.disabled = false
        this.loading_btn_confirm = false
      }
    }
  }
}
</script>

<style></style>
