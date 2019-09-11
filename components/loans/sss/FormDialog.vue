<template>
  <div class="text-xs-center">
    <v-dialog v-model="show" width="1000" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2">
          {{ loanExists ? 'Update Loan - ' + sssLoan.ref_no_dsp : 'Save Loan' }}
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
                        v-model="sssLoan.loaned_at"
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
            </v-container>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="onSaveUpdate">
            {{ loanExists ? 'Update' : 'Save' }}
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
import { mapActions } from 'vuex'
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
    loanExists() {
      return _.has(this.sssLoan, 'id')
    }
  },
  methods: {
    ...mapActions({
      clearErrors: 'validation/clearErrors'
    }),
    async onSaveUpdate() {
      const data = _.omit(this.sssLoan, [
        'balance',
        'employee',
        'progress',
        'ref_no_dsp'
      ])
      try {
        let response = {}

        if (this.loanExists) {
          response = await this.$axios.$patch(
            `sss-loan/resource/${data.id}`,
            data
          )
        } else {
          response = await this.$axios.$post('sss-loan/resource', data)
        }

        this.show = false
        this.$emit('saved-updated:loan', response.data)
      } catch (error) {}
    },
    onClose() {
      this.show = false
      this.clearErrors()
    }
  }
}
</script>
