<template>
  <div class="text-xs-center">
    <v-dialog v-model="show" width="1000" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Create Loan
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-container>
              <v-layout row wrap>
                <v-flex xs12 md4>
                  <v-autocomplete
                    v-model="loan.employee_id"
                    :disabled="disabled"
                    :error-messages="
                      errors.employee_id ? errors.employee_id[0] : ''
                    "
                    :items="employees"
                    item-text="fullname"
                    item-value="id"
                    clearable
                    label="Employee"
                    placeholder="Employee"
                    @change="onChangeFilters"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs12 md4>
                  <v-autocomplete
                    v-model="loan.subject"
                    :disabled="disabled"
                    :error-messages="errors.subject ? errors.subject[0] : ''"
                    :items="[
                      { value: 'sss', text: 'SSS' },
                      { value: 'pagibig', text: 'PagIbig' }
                    ]"
                    item-text="text"
                    item-value="value"
                    clearable
                    label="Subject"
                    placeholder="Subject"
                    @change="onChangeFilters"
                  ></v-autocomplete>
                </v-flex>
                <v-btn
                  flat
                  icon
                  :color="filterBtn.color"
                  :disabled="filterBtn.disabled"
                  class="ml-5 mt-4"
                  :loading="employee_loading"
                  @click="onVerify"
                >
                  <v-icon>{{ filterBtn.icon }}</v-icon>
                </v-btn>
              </v-layout>
              <template v-if="fieldset_visible">
                <v-layout row wrap>
                  <v-flex xs12 md4>
                    <v-text-field
                      v-model="loan.ref_no"
                      :disabled="disabled"
                      :error-messages="errors.ref_no ? errors.ref_no[0] : ''"
                      label="Reference No."
                      placeholder="Reference No."
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md4>
                    <v-text-field
                      v-model="loan.amount_loaned"
                      :disabled="disabled"
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
                      v-model="loan.amortization"
                      :disabled="disabled"
                      :error-messages="
                        errors.amortization ? errors.amortization[0] : ''
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
                          :disabled="disabled"
                          label="Loaned at"
                          placeholder="Loaned at"
                          append-icon="event"
                          :error-messages="
                            errors.loaned_at ? errors.loaned_at[0] : ''
                          "
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="loan.loaned_at"
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
            :loading="loading_save_btn"
            color="primary"
            flat
            @click="onSaveUpdate"
          >
            Save
          </v-btn>
          <v-btn color="primary" flat :disabled="disabled" @click="onClose">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
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
      disabled: false,
      loading_save_btn: false,
      filterBtn: {
        color: 'blue',
        icon: 'build',
        disabled: false
      },
      employee_loading: false,
      fieldset_visible: false,
      loan: {},
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
      return this.loan.loaned_at
        ? moment(this.loan.loaned_at).format('MMMM Do YYYY')
        : ''
    }
  },
  methods: {
    ...mapActions({
      clearErrors: 'validation/clearErrors'
    }),
    async onSaveUpdate() {
      try {
        this.disabled = true
        this.loading_save_btn = true
        const response = await this.$axios.$post('loans/government/', this.loan)

        this.show = false
        this.disabled = false
        this.loading_save_btn = false
        this.onChangeFilters('close')
        this.$emit('saved-updated:loan', response.data)
      } catch (error) {
        this.disabled = false
        this.loading_save_btn = false
      }
    },
    onChangeFilters(action = null) {
      if (action === 'close') {
        this.loan = {}
        this.clearErrors()
      }

      this.filterBtn = {
        color: 'blue',
        icon: 'build',
        disabled: false
      }

      this.fieldset_visible = false
    },
    async onVerify() {
      this.disabled = true
      this.fieldset_visible = false
      this.employee_loading = true
      try {
        await this.$axios.$post(`loans/government/verify`, {
          employee_id: this.loan.employee_id,
          subject: this.loan.subject
        })
        this.filterBtn = {
          color: 'green',
          icon: 'verified_user',
          disabled: true
        }
        this.disabled = false
        this.fieldset_visible = true
        this.employee_loading = false
      } catch (error) {
        if (error.response.status === 422) {
          this.disabled = false
          this.fieldset_visible = false
          this.employee_loading = false
        }
      }
    },
    onClose() {
      this.show = false
      this.onChangeFilters('close')
    }
  }
}
</script>
