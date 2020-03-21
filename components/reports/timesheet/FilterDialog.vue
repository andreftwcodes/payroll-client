<template>
  <v-dialog v-model="show" persistent width="700">
    <v-card>
      <v-card-title class="headline grey lighten-2">
        Filters
      </v-card-title>
      <v-form>
        <v-container>
          <v-layout row wrap>
            <v-flex xs6>
              <v-select
                v-model="filters.employee_id"
                :disabled="disabled"
                :error-messages="
                  errors.employee_id ? errors.employee_id[0] : ''
                "
                :items="employees"
                :item-text="'fullname'"
                :item-value="'id'"
                clearable
                label="Employee"
                append-icon="people_alt"
                placeholder="Employee"
              ></v-select>
            </v-flex>
          </v-layout>
          <span><strong>Range period</strong></span>
          <v-layout row wrap>
            <v-flex xs6>
              <v-menu
                v-model="from_picker"
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
                    :value="formattedFromDate"
                    :disabled="disabled"
                    v-on="on"
                    label="From"
                    append-icon="event"
                    readonly
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="filters.from"
                  :max="_now()"
                  @input="from_picker = false"
                ></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs6>
              <v-menu
                v-model="to_picker"
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
                    :value="formattedToDate"
                    :disabled="disabled"
                    v-on="on"
                    label="To"
                    append-icon="event"
                    readonly
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="filters.to"
                  :max="_now()"
                  @input="to_picker = false"
                ></v-date-picker>
              </v-menu>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="disabled"
          :loading="loading_filter_btn"
          @click.prevent="onFilter"
          color="primary"
          flat
        >
          Filter
        </v-btn>
        <v-btn
          :disabled="disabled"
          @click.prevent="onCancel"
          color="primary"
          flat
        >
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
      default: () => []
    }
  },
  data() {
    return {
      disabled: false,
      loading_filter_btn: false,
      from_picker: false,
      to_picker: false,
      filters: {
        employee_id: null,
        from: this._now('first-month'),
        to: this._now()
      }
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
    formattedFromDate() {
      return this.filters.from
        ? moment(this.filters.from).format('MMMM Do YYYY')
        : ''
    },
    formattedToDate() {
      return this.filters.to
        ? moment(this.filters.to).format('MMMM Do YYYY')
        : ''
    }
  },
  methods: {
    ...mapActions({
      clearErrors: 'validation/clearErrors'
    }),
    async onFilter() {
      try {
        this.disabled = true
        this.loading_filter_btn = true
        const response = await this.$axios.$get(`reports/get-timesheet`, {
          params: this.filters
        })
        this.show = false
        this.disabled = false
        this.loading_filter_btn = false
        this.$emit('filtered:timesheet', response.data)
      } catch (error) {
        this.disabled = false
        this.loading_filter_btn = false
      }
    },
    onCancel() {
      this.show = false
      this.clearErrors()
    }
  }
}
</script>

<style></style>
