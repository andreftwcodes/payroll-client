<template>
  <div class="text-xs-center">
    <v-dialog v-model="show" width="1000" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Create SSS Loan
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-container>
              <v-layout row wrap>
                <v-flex xs12 md4>
                  <v-autocomplete
                    v-model="sssLoan.employee_id"
                    :error-messages="
                      errors.employee_id ? errors.employee_id[0] : ''
                    "
                    :items="employees"
                    :loading="employee_loading"
                    item-text="fullname"
                    item-value="id"
                    clearable
                    label="Employee"
                    placeholder="Employee"
                    @change="onChangedEmployee"
                  ></v-autocomplete>
                </v-flex>
              </v-layout>
              <template v-if="fieldset_visible">
                <v-layout row wrap>
                  <v-flex xs12 md4>
                    <v-text-field
                      v-model="sssLoan.ref_no"
                      :error-messages="errors.ref_no ? errors.ref_no[0] : ''"
                      label="Reference No."
                      placeholder="Reference No."
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md4>
                    <v-text-field
                      v-model="sssLoan.amount_loaned"
                      :error-messages="
                        errors.amount_loaned ? errors.amount_loaned[0] : ''
                      "
                      label="Loaned Amount"
                      placeholder="00.00"
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
                      placeholder="00.00"
                      append-icon="money"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
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
                          v-model="loanedAtDateFormatted"
                          label="Loaned at"
                          append-icon="event"
                          :error-messages="
                            errors.loaned_at ? errors.loaned_at[0] : ''
                          "
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="sssLoan.loaned_at"
                        :max="_now()"
                        @input="dateMenu = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-flex>
                </v-layout>
              </template>
            </v-container>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            v-show="fieldset_visible"
            color="primary"
            flat
            @click="onSaveUpdate"
          >
            Save
          </v-btn>
          <v-btn color="primary" flat @click="onClose">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import { mapActions } from 'vuex'
export default {
  props: {
    value: {
      type: Boolean
    },
    employees: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      employee_loading: false,
      fieldset_visible: false,
      sssLoan: {},
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
    },
    loanedAtDateFormatted() {
      return this.sssLoan.loaned_at
        ? moment(this.sssLoan.loaned_at).format('MMMM Do YYYY')
        : ''
    }
  },
  methods: {
    ...mapActions({
      clearErrors: 'validation/clearErrors'
    }),
    async onSaveUpdate() {
      try {
        const response = await this.$axios.$post(
          'sss-loan/resource',
          this.sssLoan
        )

        this.show = false
        this.onChangedEmployee(undefined)
        this.$emit('saved-updated:loan', response.data)
      } catch (error) {}
    },
    async onChangedEmployee(id) {
      this.clearErrors()
      this.employee_loading = true

      if (_.isUndefined(id)) {
        this.sssLoan = {}
        this.fieldset_visible = false
        this.employee_loading = false
      } else {
        try {
          await this.$axios.$get(`sss-loan/check-can-loan/${id}`)
          this.fieldset_visible = true
          this.employee_loading = false
        } catch (error) {
          if (error.response.status === 422) {
            this.fieldset_visible = false
            this.employee_loading = false
          }
        }
      }
    },
    onClose() {
      this.show = false
      this.onChangedEmployee(undefined)
    }
  }
}
</script>
