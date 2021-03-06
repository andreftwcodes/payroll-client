<template>
  <div v-if="attendance">
    <v-dialog
      v-model="show"
      :width="attendance.schedule_display ? 850 : 500"
      persistent
    >
      <v-card>
        <v-card-title class="headline grey lighten-2">
          {{ attendance.employee.fullname }}
          <v-spacer></v-spacer>
          <template v-if="attendance.schedule_display">
            <v-chip
              label
              class="title chip-schedule-display"
              color="teal"
              text-color="white"
              disabled
              >{{ attendance.schedule_display }}</v-chip
            >
          </template>
        </v-card-title>
        <v-card-text>
          <template v-if="attendance.schedule_display">
            <v-form>
              <v-container>
                <v-layout row wrap>
                  <v-flex xs12 md5>
                    <v-select
                      v-model="attendance.locale"
                      :items="locales"
                      :item-text="'name'"
                      :item-value="'id'"
                      :disabled="disabled"
                      label="Locale"
                      placeholder="Locale"
                    ></v-select>
                  </v-flex>
                  <v-spacer></v-spacer>
                  <v-flex xs12 md1>
                    <v-icon
                      :disabled="disabled"
                      @click="addRow"
                      class="mt-3"
                      medium
                      color="green darken-2"
                      >add_circle_outline</v-icon
                    >
                  </v-flex>
                </v-layout>
                <template v-if="hasTimeLogs">
                  <v-layout
                    v-for="(item, index) in attendance.time_logs"
                    :key="item.id"
                    row
                    wrap
                  >
                    <v-flex xs12 md5>
                      <v-datetime-picker
                        v-model="item.time_in"
                        :error-messages="
                          errors
                            ? errors.index === index
                              ? errors.time_in
                                ? errors.time_in[0]
                                : ''
                              : ''
                            : ''
                        "
                        :min="minimum_datetime"
                        :max="maximum_datetime"
                        :disabled="disabled"
                        display-format="MMMM Do YYYY, h:mm A"
                        label="Time In"
                        placeholder="Placeholder"
                        append-icon="access_time"
                      >
                      </v-datetime-picker>
                    </v-flex>
                    <v-flex xs12 md5>
                      <v-datetime-picker
                        v-model="item.time_out"
                        :error-messages="
                          errors
                            ? errors.index === index
                              ? errors.time_out
                                ? errors.time_out[0]
                                : ''
                              : ''
                            : ''
                        "
                        :min="minimum_datetime"
                        :max="maximum_datetime"
                        :disabled="disabled"
                        display-format="MMMM Do YYYY, h:mm A"
                        label="Time Out"
                        placeholder="Placeholder"
                        append-icon="access_time"
                      >
                      </v-datetime-picker>
                    </v-flex>
                    <v-flex xs12 md1></v-flex>
                    <v-flex xs12 md1>
                      <v-icon
                        :disabled="disabled"
                        @click.prevent="onDelete(index)"
                        class="delete_icon"
                        color="red"
                        medium
                        >highlight_off</v-icon
                      >
                    </v-flex>
                  </v-layout>
                </template>
                <template v-else>
                  <p class="ma-0">
                    <strong>NOTE</strong>: Click the <kbd>Plus Button</kbd> to
                    add a datetime field.
                  </p>
                </template>
              </v-container>
            </v-form>
          </template>
          <template v-else>
            <p class="text-md-center font-weight-black ma-0">
              No schedule was assigned accordingly for the given day.
            </p>
          </template>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <template v-if="attendance.schedule_display">
            <v-btn
              :disabled="disabled"
              :loading="loading_save_update_btn"
              @click.prevent="saveUpdateTimeLogs"
              color="primary"
              flat
            >
              {{ hasTimeLogs ? (hasId ? 'Update' : 'Save') : 'Absent' }}
            </v-btn>
            <v-btn :disabled="disabled" @click="onCancel" color="primary" flat>
              Cancel
            </v-btn>
          </template>
          <template v-else>
            <v-btn @click="onCancel" color="primary" flat>
              Close
            </v-btn>
          </template>
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
  props: {
    value: {
      type: Boolean
    },
    attendance: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      disabled: false,
      loading_save_update_btn: false
    }
  },
  computed: {
    ...mapGetters({
      locales: 'locales',
      selected_date: 'attendances/selected_date'
    }),
    show: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },
    hasTimeLogs() {
      return !_.isEmpty(this.attendance.time_logs)
    },
    hasId() {
      return _.has(this.attendance, 'id')
    },
    minimum_datetime() {
      return moment(this.selected_date).format('YYYY-MM-DD')
    },
    maximum_datetime() {
      return moment(this.minimum_datetime)
        .add(1, 'days')
        .format('YYYY-MM-DD')
    }
  },
  methods: {
    ...mapActions({
      clearErrors: 'validation/clearErrors'
    }),
    mappedLocale() {
      const locale = this.attendance.locale
      return _.isObject(locale) ? locale.id : locale
    },
    addRow() {
      this.attendance.time_logs.push({ time_in: null, time_out: null })
    },
    onDelete(indexOfItem) {
      if (_.has(this.errors, ['index'])) {
        if (indexOfItem === this.errors.index) {
          this.clearErrors()
        }
      }
      this.attendance.time_logs.splice(indexOfItem, 1)
    },
    onCancel() {
      this.show = false
      this.$emit('attendance:closed')
    },
    async saveUpdateTimeLogs() {
      try {
        this.disabled = true
        this.loading_save_update_btn = true
        if (this.hasId) {
          const response = await this.$axios.$patch(
            `attendances/${this.attendance.id}`,
            {
              locale_id: this.mappedLocale(),
              time_logs: this.attendance.time_logs
            }
          )
          this.disabled = false
          this.loading_save_update_btn = false
          this.$emit('attendance:updated', response.data)
        } else {
          const response = await this.$axios.$post('attendances', {
            employee_id: this.attendance.employee.id,
            attended_at: this.attendance.attended_at,
            locale_id: this.mappedLocale(),
            time_logs: this.attendance.time_logs
          })
          this.disabled = false
          this.loading_save_update_btn = false
          this.$emit('attendance:saved', response.data)
        }

        this.show = false
      } catch (error) {
        this.disabled = false
        this.loading_save_update_btn = false
      }
    }
  }
}
</script>

<style>
.delete_icon {
  margin-top: 18px;
}
.chip-schedule-display {
  margin: 0;
}
</style>
