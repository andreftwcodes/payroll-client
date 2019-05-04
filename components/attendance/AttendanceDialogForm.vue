<template>
  <v-dialog v-model="show" persistent width="1000">
    <v-card v-if="attendance">
      <v-card-title class="headline grey lighten-2" primary-title>
        {{ attendance.employee.fullname }}
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-container>
            <v-layout>
              <v-flex xs12 md4>
                <v-select
                  v-model="attendance.locale"
                  :items="locales"
                  :item-text="'name'"
                  :item-value="'id'"
                  label="Locale"
                  placeholder="Locale"
                ></v-select>
              </v-flex>

              <v-flex xs12 md4>
                <v-dialog
                  ref="dialog1"
                  v-model="timepicker1"
                  :return-value.sync="attendance.start"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="attendance.start"
                      :error-messages="errors.start ? errors.start[0] : ''"
                      label="Time In"
                      append-icon="access_time"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="timepicker1"
                    v-model="attendance.start"
                    full-width
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      flat
                      color="primary"
                      :disabled="attendance.start === null"
                      @click="attendance.start = null"
                      >Reset</v-btn
                    >
                    <v-btn flat color="primary" @click="timepicker1 = false"
                      >Cancel</v-btn
                    >
                    <v-btn
                      flat
                      color="primary"
                      @click="$refs.dialog1.save(attendance.start)"
                      >OK</v-btn
                    >
                  </v-time-picker>
                </v-dialog>
              </v-flex>

              <v-flex xs12 md4>
                <v-dialog
                  ref="dialog2"
                  v-model="timepicker2"
                  :return-value.sync="attendance.end"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="attendance.end"
                      :error-messages="errors.end ? errors.end[0] : ''"
                      label="Time Out"
                      append-icon="access_time"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="timepicker2"
                    v-model="attendance.end"
                    full-width
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      flat
                      color="primary"
                      :disabled="attendance.end === null"
                      @click="attendance.end = null"
                      >Reset</v-btn
                    >
                    <v-btn flat color="primary" @click="timepicker2 = false"
                      >Cancel</v-btn
                    >
                    <v-btn
                      flat
                      color="primary"
                      @click="$refs.dialog2.save(attendance.end)"
                      >OK</v-btn
                    >
                  </v-time-picker>
                </v-dialog>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click.prevent="update">
          Update
        </v-btn>
        <v-btn color="primary" flat @click="show = false">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
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
      timepicker1: false,
      timepicker2: false
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
    }
  },
  methods: {
    mappedLocale() {
      const locale = this.attendance.locale
      return _.isObject(locale) ? locale.id : locale
    },
    async update() {
      try {
        const response = await this.$axios.$patch(
          `attendances/${this.attendance.id}`,
          {
            locale_id: this.mappedLocale(),
            start: this.attendance.start,
            end: this.attendance.end
          }
        )
        this.show = false
        this.$emit('attendance:updated', response.data)
      } catch (error) {}
    }
  }
}
</script>

<style></style>
