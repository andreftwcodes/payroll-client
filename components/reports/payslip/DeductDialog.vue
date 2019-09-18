<template>
  <div class="text-xs-center">
    <v-dialog v-model="show" width="600" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Deductions
        </v-card-title>

        <v-card-text>
          <v-flex class="xs12">
            <v-checkbox
              v-model="filters.contributions"
              :disabled="payslipFlags.contributions !== true"
              color="error"
              label="Contributions (SSS, PhilHealth, PagIbig)"
            ></v-checkbox>
            <template v-if="payslipFlags.loans">
              <div
                v-for="item in payslipFlags.loans"
                :key="item.id"
                class="loan-div ml-5"
              >
                <v-checkbox
                  v-model="loan"
                  color="error"
                  :label="`${item.subject} Loan | #${item.ref_no}`"
                  disabled
                ></v-checkbox>
                <p v-if="item.message" class="loan-message ml-5 red--text">
                  {{ item.message }}
                </p>
              </div>
            </template>
            <template v-if="payslipFlags.cash_advance">
              <v-checkbox
                v-model="filters.cash_advance"
                :disabled="payslipFlags.cash_advance.disabled"
                color="error"
                :label="
                  `Cash Advance | Balance: ${payslipFlags.cash_advance.balance_display}`
                "
              ></v-checkbox>
              <v-flex class="xs12 md7">
                <v-text-field
                  v-model="payslipFlags.cash_advance.amount_deductible"
                  :disabled="!filters.cash_advance"
                  :error-messages="
                    errors.amount_deductible ? errors.amount_deductible[0] : ''
                  "
                  label="Deductible Amount"
                  placeholder="Deductible Amount"
                ></v-text-field>
              </v-flex>
            </template>
          </v-flex>
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
import { mapGetters, mapActions } from 'vuex'
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
      payslipFlags: {},
      loan: false
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
    },
    'filters.contributions': function(newVal) {
      this.loan = newVal
    },
    'filters.cash_advance': function(newVal) {
      if (!newVal) {
        if (this.errors) {
          const errors = _.update(
            _.cloneDeep(this.errors),
            'amount_deductible[0]',
            n => null
          )
          this.setErrors(errors)
        }
        this.payslipFlags.cash_advance.amount_deductible = this.flags.cash_advance.amount_deductible
      }
    }
  },
  methods: {
    ...mapActions({
      setErrors: 'validation/setErrors'
    }),
    async onConfirm() {
      const filters = {
        contributions: this.filters.contributions,
        ca_amount_deductible: this.filters.cash_advance
          ? this.payslipFlags.cash_advance.amount_deductible
          : 0,
        loan_id: !_.isNull(this.payslipFlags.loans)
          ? _.map(this.payslipFlags.loans, 'id')
          : null
      }

      try {
        if (this.filters.cash_advance) {
          const data = {
            amount_deductible: filters.ca_amount_deductible,
            balance: this.payslipFlags.cash_advance.balance
          }
          await this.$axios.$post('reports-validator/deduction-filters', data)
        }

        this.$emit('confirm:deduct', filters)
        this.onClose()
      } catch (error) {}
    },
    onClose() {
      this.show = false
      Object.assign(this.$data, this.$options.data())
    }
  }
}
</script>

<style>
.loan-div {
  margin: -20px 0;
}
.loan-message {
  margin-top: -10px;
  margin-bottom: 30px;
}
</style>
