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
                    <span class="red--text">{{ errors.period[0] }}</span>
                  </v-flex>
                </v-layout>
              </template>
            </template>
            <template v-else-if="step === 2">
              {{ flag }}
            </template>
          </v-container>
        </v-form>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <template v-if="step === 1">
            <v-btn color="primary" flat :disabled="disabled" @click="onVerify">
              Verify
            </v-btn>
          </template>
          <template v-else-if="step === 2">
            <v-btn color="primary" flat :disabled="disabled" @click="onPickUp">
              Pick Up
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
      step: 1
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
      filterDialog: 'payslip/filterDialog'
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
        const response = await this.$axios.$get(`payslip/verify-period`, {
          params
        })
        this.step = 2
        this.disabled = false
        this.flag = response.data
      } catch (error) {
        this.disabled = false
      }
    },
    onPickUp() {
      console.log(1)
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

<style></style>
