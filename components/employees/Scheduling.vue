<template>
  <v-form @submit.prevent="submit">
    <v-container fluid grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs12>
          <v-layout row wrap>
            <v-flex xs12 md4>
              <v-autocomplete
                v-model="schedule"
                label="Schedules"
                placeholder="Select a schedule"
                :items="schedule_presets"
              ></v-autocomplete>
            </v-flex>
            <v-spacer />
            <v-btn
              v-show="undoBtnVisibility"
              small
              round
              color="info"
              class="mt-4"
              @click="onUndo"
              >Undo</v-btn
            >
          </v-layout>
          <template v-if="schedules">
            <v-data-table
              :headers="headers"
              :items="schedules"
              class="elevation-1"
              hide-actions
            >
              <template v-slot:items="props">
                <td class="text-xs-left">{{ props.item.day_dsp }}</td>
                <td>
                  <v-text-field
                    v-model="props.item.start_1"
                    type="time"
                    label="Time In"
                    placeholder="Placeholder"
                    class="mt-3"
                    :disabled="!props.item.status"
                  ></v-text-field>
                </td>
                <td>
                  <v-text-field
                    v-model="props.item.end_1"
                    type="time"
                    label="Time Out"
                    placeholder="Placeholder"
                    class="mt-3"
                    :disabled="!props.item.status"
                  ></v-text-field>
                </td>
                <td>
                  <v-text-field
                    v-model="props.item.start_2"
                    type="time"
                    label="Time In"
                    placeholder="Placeholder"
                    class="mt-3"
                    :disabled="!props.item.status"
                  ></v-text-field>
                </td>
                <td>
                  <v-text-field
                    v-model="props.item.end_2"
                    type="time"
                    label="Time Out"
                    placeholder="Placeholder"
                    class="mt-3"
                    :disabled="!props.item.status"
                  ></v-text-field>
                </td>
                <td>
                  <v-switch
                    v-model="props.item.status"
                    class="mt-3"
                    color="success"
                  ></v-switch>
                </td>
              </template>
            </v-data-table>
          </template>
        </v-flex>
      </v-layout>
    </v-container>
    <v-layout row wrap>
      <slot name="buttons"></slot>
    </v-layout>
  </v-form>
</template>

<script>
import _ from 'lodash'
import { mapMutations } from 'vuex'
export default {
  props: {
    schedulesProp: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      headers: [
        { text: 'Day', value: '', sortable: false },
        { text: 'Frist Quarter', value: '', sortable: false },
        { text: '', value: '', sortable: false },
        { text: 'Second Quarter', value: '', sortable: false },
        { text: '', value: '', sortable: false },
        { text: 'Status', value: '', sortable: false }
      ],
      schedules: _.cloneDeep(this.schedulesProp),
      schedule: null,
      schedule_presets: [
        {
          start_1: null,
          end_1: null,
          start_2: null,
          end_2: null,
          value: 1,
          text: 'Custom'
        },
        {
          start_1: '08:00:00',
          end_1: '12:00:00',
          start_2: '13:00:00',
          end_2: '17:00:00',
          value: 2,
          text: '08:00 AM - 05:00 PM'
        }
      ],
      undoBtnVisibility: false
    }
  },
  watch: {
    schedule: function(newValue) {
      const schedules = []
      const schedule = _.find(this.schedule_presets, ['value', newValue])
      for (let day = 1; day <= 7; day++) {
        schedules.push({
          day: day,
          day_dsp: this.dayInWords(day),
          start_1: schedule.start_1,
          end_1: schedule.end_1,
          start_2: schedule.start_2,
          end_2: schedule.end_2,
          status: day !== 7
        })
      }
      this.schedules = schedules
    },
    schedules: function(newValue, oldValue) {
      this.undoBtnVisibility =
        !_.isEmpty(this.schedulesProp) && !_.eq(oldValue, newValue)
    }
  },
  methods: {
    ...mapMutations({
      setScheduling: 'employees/SET_SCHEDULING'
    }),
    dayInWords(key) {
      const days = [
        {
          key: 1,
          text: 'Monday'
        },
        {
          key: 2,
          text: 'Tuesday'
        },
        {
          key: 3,
          text: 'Wednesday'
        },
        {
          key: 4,
          text: 'Thursday'
        },
        {
          key: 5,
          text: 'Friday'
        },
        {
          key: 6,
          text: 'Saturday'
        },
        {
          key: 7,
          text: 'Sunday'
        }
      ]

      return _.find(days, ['key', key]).text
    },
    onUndo() {
      this.schedules = _.cloneDeep(this.schedulesProp)
      this.undoBtnVisibility = false
    },
    submit() {
      this.$emit('saved:scheduling')
      this.setScheduling(this.schedules)
    }
  }
}
</script>

<style></style>
