<template>
  <div class="text-xs-center">
    <v-dialog v-model="show" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Deductions
        </v-card-title>

        <v-card-text>
          <v-checkbox
            v-model="filters.contributions"
            :disabled="flags.contributions !== true"
            label="Contributions (SSS, PhilHealth, PagIbig)"
          ></v-checkbox>
          <v-checkbox
            v-model="filters.cash_advance"
            label="Cash advance"
          ></v-checkbox>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="onConfirm">
            Confirm
          </v-btn>
          <v-btn color="primary" flat @click="onClose">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    value: {
      type: Boolean
    }
  },
  data() {
    return {
      filters: {
        contributions: false,
        cash_advance: false
      }
    }
  },
  computed: {
    ...mapGetters({
      flags: 'payslip/flags'
    }),
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
    onConfirm() {
      this.$emit('confirm:deduct', this.filters)
      this.onClose()
    },
    onClose() {
      this.show = false
      Object.assign(this.$data, this.$options.data())
    }
  }
}
</script>

<style></style>
