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
                    :disabled="disabled"
                    :loading="loading_payment_period"
                    @change="onChangePaymentPeriod"
                    item-text="text"
                    item-value="value"
                    label="Payment Period"
                  ></v-select>
                </v-flex>
              </v-layout>
              <template v-if="fieldset">
                <v-layout>
                  <v-flex md8>
                    <v-autocomplete
                      v-model="employee"
                      :items="employees"
                      :disabled="disabled"
                      :error-messages="
                        errors.employee_id ? errors.employee_id[0] : ''
                      "
                      item-text="fullname"
                      item-value="id"
                      label="Employee"
                      append-icon="supervisor_account"
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
                          :disabled="disabled"
                          :error-messages="errors.from ? errors.from[0] : ''"
                          v-on="on"
                          label="From"
                          append-icon="event"
                          readonly
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
                          :disabled="disabled"
                          :error-messages="errors.to ? errors.to[0] : ''"
                          v-on="on"
                          label="To"
                          append-icon="event"
                          readonly
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
                  <!-- Removed => :disabled="!flag.contributions.disabled" (20200309) -->
                  <v-checkbox
                    v-model="contributions"
                    :readonly="flag.contributions.disabled"
                    color="error"
                    label="Contributions (SSS, PhilHealth, PagIbig)"
                  ></v-checkbox>
                </v-flex>
              </v-layout>
              <v-layout class="payslip__layout">
                <v-flex class="pt-0 pb-0">
                  <p class="subheading mt-3 ml-1">Loans</p>
                  <template v-if="flag.loans.length">
                    <div
                      v-for="item in flag.loans"
                      :key="item.id"
                      class="ml-5 loan__items"
                    >
                      <v-checkbox
                        v-model="loans"
                        :value="item.id"
                        :label="`${item.subject} - ${item.amortization}`"
                        :disabled="item.disabled || disabled"
                        class="loan_checkboxes"
                        color="error"
                      ></v-checkbox>
                      <p class="ml-5 mt-3 font-weight-bold">
                        <template v-if="isObject(item.message)">
                          {{ item.message.label }} :
                          <v-icon
                            :color="item.message.response ? 'green' : 'red'"
                            style="margin-bottom: -5px;"
                            >{{
                              item.message.response ? 'done' : 'clear'
                            }}</v-icon
                          >
                        </template>
                        <template v-else>
                          {{ item.message }}
                        </template>
                      </p>
                    </div>
                  </template>
                  <template v-else>
                    <p class="ml-5 red--text">- NA</p>
                  </template>
                </v-flex>
              </v-layout>
              <v-layout class="payslip__layout">
                <v-flex class="pt-0 pb-0">
                  <v-checkbox
                    v-model="cash_advance"
                    :disabled="flag.cash_advance.disabled || disabled"
                    :label="`Cash Advance ${flag.cash_advance.display}`"
                    @change="onChangeCashAdvance"
                    color="error"
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
              :disabled="disabled"
              :loading="loading_verify"
              @click="onVerify"
              color="primary"
              flat
            >
              Verify
            </v-btn>
          </template>
          <template v-else-if="step === 2">
            <v-btn
              :disabled="disabled"
              :loading="loading_generate"
              @click="onGenerate"
              color="primary"
              flat
            >
              Generate
            </v-btn>
            <v-btn :disabled="disabled" @click="step = 1" color="primary" flat>
              Back
            </v-btn>
          </template>
          <v-btn :disabled="disabled" @click="onCancel" color="primary" flat>
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
      loans: [],
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

      if (this.loans.length) {
        data = _.assign({ loan_ids: this.loans }, data)
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
    },
    'flag.contributions.checked': function(truthy) {
      this.contributions = truthy
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
        this.flag = {}
        this.contributions = false
        this.loans = []
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
    },
    isObject(value) {
      return _.isObject(value)
    }
  }
}
</script>

<style scoped>
.payslip__layout {
  margin: -20px -8px !important;
}
.loan__items:first-of-type {
  margin-top: -10px;
}
.loan__items:last-child {
  margin-bottom: 20px;
}
.loan_checkboxes {
  margin-bottom: -25px;
}
</style>
