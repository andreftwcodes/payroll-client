<template>
  <div class="text-xs-center">
    <v-dialog v-model="show" width="600">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Deductions
        </v-card-title>

        <v-card-text>
          <v-checkbox
            v-model="filters.contributions"
            :disabled="payslipFlags.contributions !== true"
            label="Contributions (SSS, PhilHealth, PagIbig)"
          ></v-checkbox>
          <template v-if="payslipFlags.cash_advance">
            <v-checkbox
              v-model="filters.cash_advance"
              :disabled="payslipFlags.cash_advance.disabled"
              :label="
                `Cash Advance | Balance: ${payslipFlags.cash_advance.balance}`
              "
            ></v-checkbox>
            <v-flex class="xs12 md4">
              <v-text-field
                v-model="payslipFlags.cash_advance.amount_deductible"
                :disabled="!filters.cash_advance"
                label="Deductible Amount"
                placeholder="Deductible Amount"
              ></v-text-field>
            </v-flex>
          </template>
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
import _ from 'lodash'
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
      },
      payslipFlags: {}
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
  watch: {
    show: function(newVal) {
      this.payslipFlags = _.cloneDeep(this.flags)
    }
  },
  methods: {
    onConfirm() {
      const filters = {
        contributions: this.filters.contributions,
        ca_amount_deductible: this.filters.cash_advance
          ? this.payslipFlags.cash_advance.amount_deductible
          : 0
      }
      this.$emit('confirm:deduct', filters)
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
