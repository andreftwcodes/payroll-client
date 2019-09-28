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
                v-model="filters.locale_id"
                :disabled="disabled"
                chips
                multiple
                clearable
                :items="locales"
                :item-text="'name'"
                :item-value="'id'"
                label="Locale"
                append-icon="location_city"
                placeholder="Locale"
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
                    :error-messages="errors.from ? errors.from[0] : ''"
                    :disabled="disabled"
                    clearable
                    label="From"
                    append-icon="event"
                    readonly
                    @click:clear="filters.from = null"
                    v-on="on"
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
                    :error-messages="errors.to ? errors.to[0] : ''"
                    :disabled="disabled"
                    clearable
                    label="To"
                    append-icon="event"
                    readonly
                    @click:clear="filters.to = null"
                    v-on="on"
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
          color="primary"
          flat
          :disabled="disabled"
          :loading="loading_filter_btn"
          @click.prevent="onFilter"
        >
          Filter
        </v-btn>
        <v-btn
          color="primary"
          flat
          :disabled="disabled"
          @click.prevent="show = false"
        >
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import { mapGetters } from 'vuex'
export default {
  props: {
    value: {
      type: Boolean
    },
    payroll: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      disabled: false,
      loading_filter_btn: false,
      from_picker: false,
      to_picker: false,
      filters: {
        from: null,
        to: null,
        locale_id: []
      }
    }
  },
  computed: {
    ...mapGetters({
      locales: 'locales'
    }),
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
    },
    filteredFilters() {
      return _.pickBy(this.filters, _.identity)
    }
  },
  methods: {
    async onFilter() {
      try {
        this.disabled = true
        this.loading_filter_btn = true
        await this.$axios.$post(
          'reports-validator/payroll-periods/filters',
          this.filteredFilters
        )
        this.show = false
        this.disabled = false
        this.loading_filter_btn = false
        this.$emit('on:filter', this.filteredFilters)
      } catch (error) {
        this.disabled = false
        this.loading_filter_btn = false
      }
    }
  }
}
</script>

<style></style>
