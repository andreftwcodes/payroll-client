<template>
  <div>
    <v-flex xs12 class="pb-0">
      <v-select
        v-model="payment_period"
        :loading="payment_period_loading"
        :items="pp_items"
        item-text="text"
        item-value="value"
        label="Payment Period"
        :disabled="disabled"
      ></v-select>
    </v-flex>
    <v-flex xs12 class="pt-0 pb-0">
      <v-autocomplete
        v-model="employee"
        :items="employees"
        item-text="fullname"
        item-value="id"
        label="Employee"
        :disabled="disabled"
      ></v-autocomplete>
    </v-flex>
    <v-flex xs12 class="pt-0 pb-0">
      <v-dialog
        ref="dialog"
        v-model="modalFrom"
        :return-value.sync="dateFrom"
        persistent
        lazy
        full-width
        width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="dateFrom"
            label="Period From"
            append-icon="event"
            readonly
            :disabled="disabled"
            :error-messages="errors.from ? errors.from[0] : ''"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="dateFrom" :max="date" scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="modalFrom = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.dialog.save(dateFrom)"
            >OK</v-btn
          >
        </v-date-picker>
      </v-dialog>
    </v-flex>
    <v-flex xs12 class="pt-0 pb-0">
      <v-dialog
        ref="dialog2"
        v-model="modalTo"
        :return-value.sync="dateTo"
        persistent
        lazy
        full-width
        width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="dateTo"
            label="To"
            append-icon="event"
            readonly
            :disabled="disabled"
            :error-messages="errors.to ? errors.to[0] : ''"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="dateTo" :max="date" scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="modalTo = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.dialog2.save(dateTo)"
            >OK</v-btn
          >
        </v-date-picker>
      </v-dialog>
    </v-flex>
    <v-flex xs12 class="pt-0">
      <v-btn
        color="primary"
        block
        round
        :disabled="disabled"
        @click.prevent="onPickUp"
        >Pick Up</v-btn
      >
    </v-flex>
    <v-layout column align-center>
      <v-flex xs12 class="pt-0">
        <v-btn v-if="canPrint" color="primary" round @click.prevent="onPrint"
          >Print</v-btn
        >
      </v-flex>
    </v-layout>
    <MessageDialog v-model="msgDialog" :message="message" />
  </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters, mapActions } from 'vuex'
import MessageDialog from '@/components/reports/payslip/MessageDialog'
export default {
  components: {
    MessageDialog
  },
  props: {
    employees: {
      type: Array,
      required: true
    },
    canPrint: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      payment_period: 'all',
      pp_items: [
        {
          value: 'all',
          text: 'All'
        },
        {
          value: 'weekly',
          text: 'Weekly'
        },
        {
          value: 'monthly',
          text: 'Monthly'
        }
      ],
      employee: null,
      dateFrom: this._date('first-month'),
      dateTo: this._date(),
      date: this._date(),
      modalFrom: false,
      modalTo: false,
      msgDialog: false,
      message: null
    }
  },
  computed: {
    ...mapGetters({
      payment_period_loading: 'payslip/payment_period_loading',
      disabled: 'payslip/disabled'
    })
  },
  watch: {
    employees: {
      handler: function(newValue) {
        this.employee = !_.isEmpty(newValue) ? _.head(newValue).id : null
      },
      immediate: true
    },
    payment_period: function(newValue) {
      this.setPaymentPeriodLoading(true)
      this.$emit('on-changed:payment-period', newValue)
    },
    employee: function() {
      this.$emit('on-changed:employee')
    }
  },
  methods: {
    ...mapActions({
      setErrors: 'validation/setErrors',
      clearErrors: 'validation/clearErrors',
      setDisabled: 'payslip/setDisabled',
      setPaymentPeriodLoading: 'payslip/setPaymentPeriodLoading'
    }),
    _date(flag) {
      const date = new Date()
      let d

      if (flag === 'first-month') {
        d = new Date(date.getFullYear(), date.getMonth(), 1)
      } else {
        d = date
      }

      return (
        d.getFullYear() +
        '-' +
        ('0' + (d.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + d.getDate()).slice(-2)
      )
    },
    periodNotInRange() {
      return new Date(this.dateFrom) > new Date(this.dateTo)
    },
    async onPickUp() {
      this.clearErrors()

      if (this.periodNotInRange()) {
        this.setErrors({
          from: ['Invalid date range.'],
          to: ['Invalid date range.']
        })
        return false
      }

      this.setDisabled(true)
      this.$emit('on-changed:employee')

      const data = {
        employee_id: this.employee,
        dateFrom: this.dateFrom,
        dateTo: this.dateTo
      }

      try {
        const response = await this.$axios.$get(
          `payslip/check-period/${data.employee_id}`,
          {
            params: {
              from: data.dateFrom,
              to: data.dateTo
            }
          }
        )

        this.setDisabled(false)

        if (response.exists) {
          this.msgDialog = true
          this.message = response.message
          return false
        }

        this.$emit('pickup:payslip', data)
      } catch (error) {}
    },
    onPrint() {
      this.$emit('show:popup-payslip')
    }
  }
}
</script>

<style></style>
