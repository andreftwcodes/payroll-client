<template>
  <v-dialog v-model="show" persistent width="850">
    <v-card v-if="attendance">
      <v-card-title class="headline grey lighten-2">
        {{ attendance.employee.fullname }}
        <v-spacer></v-spacer>
        <v-chip
          label
          class="title chip-schedule-display"
          color="teal"
          text-color="white"
          disabled
          >{{ attendance.schedule_display }}</v-chip
        >
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-container>
            <v-layout row wrap>
              <v-flex xs12 md5>
                <v-select
                  v-model="attendance.locale"
                  :items="locales"
                  :item-text="'name'"
                  :item-value="'id'"
                  label="Locale"
                  placeholder="Locale"
                ></v-select>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs12 md1>
                <v-icon
                  class="mt-3"
                  medium
                  color="green darken-2"
                  @click="addRow"
                  >add_circle_outline</v-icon
                >
              </v-flex>
            </v-layout>
            <v-layout
              v-for="(item, index) in attendance.time_logs"
              :key="item.id"
              row
              wrap
            >
              <v-flex xs12 md5>
                <v-text-field
                  v-model="item.time_in"
                  type="time"
                  label="Time In"
                  placeholder="Placeholder"
                  append-icon="access_time"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md5>
                <v-text-field
                  v-model="item.time_out"
                  type="time"
                  label="Time Out"
                  placeholder="Placeholder"
                  append-icon="access_time"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md1></v-flex>
              <v-flex xs12 md1>
                <v-icon
                  class="delete_icon"
                  color="red"
                  medium
                  @click.prevent="onDelete(index)"
                  >delete_forever</v-icon
                >
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click.prevent="saveUpdateTimeLogs">
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
    return {}
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
    addRow() {
      this.attendance.time_logs.push({ time_in: null, time_out: null })
    },
    onDelete(indexOfItem) {
      this.attendance.time_logs.splice(indexOfItem, 1)
    },
    async saveUpdateTimeLogs() {
      try {
        const response = await this.$axios.$patch(
          `attendances/${this.attendance.id}`,
          {
            locale_id: this.mappedLocale(),
            time_logs: this.attendance.time_logs
          }
        )
        this.show = false
        this.$emit('attendance:updated', response.data)
      } catch (error) {}
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
