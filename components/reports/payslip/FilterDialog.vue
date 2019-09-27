<template>
  <div class="text-xs-center">
    <v-dialog v-model="filter_dialog" width="600" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Filters
        </v-card-title>

        <v-form>
          <v-container>
            <template v-if="step === 1">
              <v-layout>
                <v-flex md6>
                  <v-select
                    v-model="payment_period"
                    :items="payment_period_items"
                    item-text="text"
                    item-value="value"
                    label="Payment Period"
                    :disabled="disabled"
                    :loading="loading_payment_period"
                    @change="onChangePaymentPeriod"
                  ></v-select>
                </v-flex>
              </v-layout>
              <template v-if="fieldset">
                <v-layout>
                  <v-flex md8>
                    <v-autocomplete
                      v-model="employee"
                      :items="employees"
                      item-text="fullname"
                      item-value="id"
                      label="Employee"
                      append-icon="supervisor_account"
                      :disabled="disabled"
                      :error-messages="
                        errors.employee_id ? errors.employee_id[0] : ''
                      "
                    ></v-autocomplete>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex md6>
                    <v-menu
                      v-model="from.menu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="fromDateFormatted"
                          label="From"
                          append-icon="event"
                          readonly
                          :disabled="disabled"
                          :error-messages="errors.from ? errors.from[0] : ''"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="from.date"
                        :max="_now()"
                        @input="from.menu = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex md6>
                    <v-menu
                      v-model="to.menu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="toDateFormatted"
                          label="To"
                          append-icon="event"
                          readonly
                          :disabled="disabled"
                          :error-messages="errors.to ? errors.to[0] : ''"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="to.date"
                        :max="_now()"
                        @input="to.menu = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-flex>
                </v-layout>
                <v-layout v-if="errors.period">
                  <v-flex>
                    <span class="red--text ml-3">{{ errors.period[0] }}</span>
                  </v-flex>
                </v-layout>
              </template>
            </template>
            <template v-else-if="step === 2">
              <v-layout class="payslip__layout">
                <v-flex class="pt-0 pb-0">
                  <v-checkbox
                    v-model="contributions"
                    :disabled="!flag.contributions || disabled"
                    color="error"
                    label="Contributions (SSS, PhilHealth, PagIbig)"
                  ></v-checkbox>
                </v-flex>
              </v-layout>
              <v-layout class="payslip__layout">
                <v-flex class="pt-0 pb-0">
                  <v-checkbox
                    v-model="loans"
                    :disabled="!flag.loans.length || disabled"
                    color="error"
                    label="Loans"
                  ></v-checkbox>

                  <div
                    v-for="item in flag.loans"
                    :key="item.id"
                    class="ml-5 loan__items"
                  >
                    <p class="mb-2">
                      <strong>{{ item.subject }}: </strong> -
                      {{ item.amortization }}
                    </p>
                    <p class="ml-3 red--text">{{ item.message }}</p>
                  </div>
                </v-flex>
              </v-layout>
              <v-layout class="payslip__layout">
                <v-flex class="pt-0 pb-0">
                  <v-checkbox
                    v-model="cash_advance"
                    color="error"
                    :disabled="flag.cash_advance.disabled || disabled"
                    :label="`Cash Advance ${flag.cash_advance.display}`"
                    @change="onChangeCashAdvance"
                  ></v-checkbox>
                  <v-flex class="ml-5" md6>
                    <v-text-field
                      v-show="!flag.cash_advance.disabled"
                      v-model="flag.cash_advance.amount_deductible"
                      :disabled="!cash_advance || disabled"
                      :error-messages="
                        errors.amount_deductible
                          ? errors.amount_deductible[0]
                          : ''
                      "
                      label="Amount Deductible"
                      placeholder="Amount Deductible"
                      class="pt-0 mb-3"
                    ></v-text-field>
                  </v-flex>
                </v-flex>
              </v-layout>
            </template>
          </v-container>
        </v-form>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <template v-if="step === 1">
            <v-btn
              color="primary"
              flat
              :disabled="disabled"
              :loading="loading_verify"
              @click="onVerify"
            >
              Verify
            </v-btn>
          </template>
          <template v-else-if="step === 2">
            <v-btn
              color="primary"
              flat
              :disabled="disabled"
              :loading="loading_generate"
              @click="onGenerate"
            >
              Generate
            </v-btn>
            <v-btn color="primary" flat :disabled="disabled" @click="step = 1">
              Back
            </v-btn>
          </template>
          <v-btn color="primary" flat :disabled="disabled" @click="onCancel">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      payment_period: 'all',
      employees: [],
      employee: null,
      disabled: false,
      loading_payment_period: false,
      from: {
        menu: false,
        date: this._now('first-month')
      },
      to: {
        menu: false,
        date: this._now()
      },
      fieldset: false,
      flag: {},
      step: 1,
      loading_verify: false,
      contributions: false,
      loans: false,
      cash_advance: false,
      amount_deductible_backup: null,
      loading_generate: false
    }
  },
  computed: {
    ...mapGetters({
      filter_dialog: 'payslip/filter_dialog',
      payment_period_items: 'payslip/payment_period_items'
    }),
    fromDateFormatted() {
      return moment(this.from.date).format('MMMM Do YYYY')
    },
    toDateFormatted() {
      return moment(this.to.date).format('MMMM Do YYYY')
    },
    dataFilters() {
      let data = {
        employee_id: this.employee,
        from: this.from.date,
        to: this.to.date,
        contributions: this.contributions
      }

      if (this.loans) {
        data = _.assign({ loan_ids: _.map(this.flag.loans, 'id') }, data)
      } else {
        _.unset(data, ['loan_ids'])
      }

      if (this.cash_advance) {
        data = _.assign(
          {
            amount_deductible: this.flag.cash_advance.amount_deductible,
            balance: this.flag.cash_advance.balance
          },
          data
        )
      } else {
        _.unset(data, ['amount_deductible', 'balance'])
      }

      return data
    }
  },
  watch: {
    filter_dialog: function(truthy) {
      if (truthy) {
        this.onChangePaymentPeriod()
      }
    },
    payment_period: function(value) {
      this.resetDateFilter()
    },
    employee: function(value) {
      this.resetDateFilter()
    }
  },
  methods: {
    ...mapActions({
      filterDialog: 'payslip/filterDialog',
      setPaySlip: 'payslip/setPaySlip',
      setDataFilters: 'payslip/setDataFilters',
      setErrors: 'validation/setErrors'
    }),
    async onChangePaymentPeriod() {
      try {
        this.step = 1
        this.employee = null
        this.disabled = true
        this.fieldset = false
        this.loading_payment_period = true
        const response = await this.$axios.$get('/reports/payslip/data', {
          params: {
            payment_period: this.payment_period
          }
        })
        this.employees = response.data
        this.disabled = false
        this.fieldset = true
        this.loading_payment_period = false
      } catch (error) {}
    },
    resetDateFilter() {
      this.from.date = this._now('first-month')
      this.to.date = this._now()
    },
    async onVerify() {
      const params = {
        employee_id: this.employee,
        from: this.from.date,
        to: this.to.date
      }

      try {
        this.disabled = true
        this.loading_verify = true
        this.contributions = false
        this.loans = false
        this.cash_advance = false
        this.amount_deductible_backup = null
        const response = await this.$axios.$get(`payslip/verify-period`, {
          params
        })
        this.step = 2
        this.disabled = false
        this.loading_verify = false
        this.flag = response.data
      } catch (error) {
        this.disabled = false
        this.loading_verify = false
      }
    },
    async onGenerate() {
      try {
        this.disabled = true
        this.loading_generate = true
        const response = await this.$axios.$get(
          `payslip/period/${this.employee}`,
          {
            params: this.dataFilters
          }
        )
        this.disabled = false
        this.loading_generate = false
        this.payment_period = 'all'
        this.setPaySlip(response)
        this.setDataFilters(this.dataFilters)
        this.filterDialog(false)
      } catch (error) {
        this.disabled = false
        this.loading_generate = false
      }
    },
    onChangeCashAdvance() {
      if (_.isNull(this.amount_deductible_backup)) {
        this.amount_deductible_backup = this.flag.cash_advance.amount_deductible
      }

      if (!this.cash_advance) {
        if (this.errors) {
          this.setErrors(
            _.update(this.errors, 'amount_deductible[0]', n => null)
          )
        }
        this.flag.cash_advance.amount_deductible = this.amount_deductible_backup
      }
    },
    onCancel() {
      this.payment_period = 'all'
      this.employee = null
      this.resetDateFilter()
      this.filterDialog(false)
    }
  }
}
</script>

<style scoped>
.payslip__layout {
  margin: -20px -8px !important;
}
.loan__items:last-child {
  margin-bottom: 25px;
}
</style>
