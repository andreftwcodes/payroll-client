<template>
  <div class="text-xs-center">
    <v-dialog v-model="show" width="1000">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Add Loan
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-container>
              <v-layout row wrap>
                <v-flex xs12 md4>
                  <v-autocomplete
                    v-model="sssLoan.employee_id"
                    :error-messages="errors.employee ? errors.employee[0] : ''"
                    :items="employees"
                    item-text="fullname"
                    item-value="id"
                    label="Employee"
                    placeholder="Employee"
                  ></v-autocomplete>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 md4>
                  <v-text-field
                    v-model="sssLoan.loan_no"
                    :error-messages="errors.loan_no ? errors.loan_no[0] : ''"
                    label="Loan No."
                    placeholder="Loan No."
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field
                    v-model="sssLoan.amount_loaned"
                    :error-messages="
                      errors.amount_loaned ? errors.amount_loaned[0] : ''
                    "
                    label="Loaned Amount"
                    placeholder="Loaned Amount"
                    append-icon="money"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field
                    v-model="sssLoan.amortization_amount"
                    :error-messages="
                      errors.amortization_amount
                        ? errors.amortization_amount[0]
                        : ''
                    "
                    label="Amortization Amount"
                    placeholder="Amortization Amount"
                    append-icon="money"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 md4>
                  <v-select
                    v-model="sssLoan.payment_terms"
                    :error-messages="
                      errors.payment_terms ? errors.payment_terms[0] : ''
                    "
                    :items="[
                      { value: 12, text: '12 Months' },
                      { value: 24, text: '24 Months' }
                    ]"
                    item-text="text"
                    item-value="value"
                    label="Payment Terms"
                    placeholder="Payment Terms"
                  ></v-select>
                </v-flex>
                <v-flex xs12 md4>
                  <v-menu
                    v-model="dateMenu"
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
                        v-model="sssLoan.date_loaned"
                        label="Loaned Date"
                        append-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="sssLoan.date_loaned"
                      :error-messages="
                        errors.date_loaned ? errors.date_loaned[0] : ''
                      "
                      :max="_now()"
                      @input="dateMenu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="onSaveUpdate">
            Save
          </v-btn>
          <v-btn color="primary" flat @click="show = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean
    },
    sssLoan: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      employees: [],
      dateMenu: false
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
  created() {
    this.getEmployees()
  },
  methods: {
    async getEmployees() {
      this.employees = (await this.$axios.$get('sss-loan/get-employees')).data
    },
    onSaveUpdate() {
      console.log(this.sssLoan)
    }
  }
}
</script>
