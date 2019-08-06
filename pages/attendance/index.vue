<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-card>
          <v-card-title>
            <v-layout row wrap>
              <v-flex md4>
                <template v-if="swap">
                  <v-autocomplete
                    :items="employees"
                    item-text="fullname"
                    item-value="id"
                    label="Select"
                    @change="onChangedEmployee"
                  ></v-autocomplete>
                </template>
                <template v-else>
                  <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                  ></v-text-field>
                </template>
              </v-flex>
              <v-icon
                large
                class="ml-3"
                :color="swap ? 'blue darken-2' : ''"
                @click="onSwap"
                >swap_horiz</v-icon
              >
              <v-spacer></v-spacer>
              <v-flex md2>
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
                      v-model="date"
                      label="Filter date"
                      append-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    :max="dateNow()"
                    @input="filterDate"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="attendances"
            :rows-per-page-items="rowsPerPage"
            :search="search"
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td>{{ props.item.employee.fullname }}</td>
              <td>{{ props.item.locale.name }}</td>
              <td>{{ props.item.time_in }}</td>
              <td>{{ props.item.time_out }}</td>
              <td>{{ props.item.remark }}</td>
              <td>
                <v-icon
                  class="mr-3"
                  color="blue darken-2"
                  @click="showAttendanceDialogForm(props.item)"
                  >edit</v-icon
                >
                <v-icon color="red">highlight_off</v-icon>
              </td>
            </template>
          </v-data-table>
        </v-card>
        <AttendanceDialogForm
          v-model="dialogForm"
          :attendance="attendance"
          @attendance:updated="attendanceUpdated"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import _ from 'lodash'
import { mapGetters, mapActions } from 'vuex'
import AttendanceDialogForm from '@/components/attendance/AttendanceDialogForm'
export default {
  middleware: 'auth',
  components: {
    AttendanceDialogForm
  },
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Fullname',
          align: 'left',
          sortable: false,
          value: 'employee.fullname'
        },
        {
          text: 'Locale',
          align: 'left',
          sortable: false,
          value: 'locale.name'
        },
        {
          text: 'Time In',
          align: 'left',
          sortable: false,
          value: 'time_in'
        },
        {
          text: 'Time Out',
          align: 'left',
          sortable: false,
          value: 'time_out'
        },
        {
          text: 'Remark',
          align: 'left',
          sortable: false,
          value: 'remark'
        },
        {
          text: '',
          align: 'left',
          sortable: false,
          value: ''
        }
      ],
      rowsPerPage: [10, 15, 20],
      attendances: [],
      attendance: null,
      date: this.dateNow(),
      dateMenu: false,
      dialogForm: false,
      swap: false
    }
  },
  computed: {
    ...mapGetters({
      employees: 'employees'
    })
  },
  async asyncData({ app }) {
    const response = await app.$axios.$get('attendances')
    return {
      attendances: response.data
    }
  },
  mounted() {
    this.filterDate(true)
  },
  methods: {
    ...mapActions({
      clearErrors: 'validation/clearErrors'
    }),
    dateNow() {
      const d = new Date()
      return (
        d.getFullYear() +
        '-' +
        ('0' + (d.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + d.getDate()).slice(-2)
      )
    },
    onSwap() {
      this.swap = !this.swap
      this.search = null
    },
    onChangedEmployee(id) {
      alert(id)
    },
    showAttendanceDialogForm(attendance) {
      this.clearErrors()
      this.dialogForm = true
      this.attendance = _.update(
        _.cloneDeep(attendance),
        'time_logs',
        timeLog => {
          return !_.isEmpty(timeLog)
            ? timeLog
            : [
                {
                  time_in: null,
                  time_out: null
                }
              ]
        }
      )
    },
    attendanceUpdated(attendance) {
      this.attendances.splice(
        _.findIndex(this.attendances, o => o.id === attendance.id),
        1,
        attendance
      )
    },
    async filterDate(loader = true) {
      this.dateMenu = false

      let loading = this.$loading

      if (loader) {
        loading = loading.show()
      }

      try {
        await this.$axios.$post('attendances', {
          created_at: this.date
        })
        const response = await this.$axios.$get('attendances', {
          params: {
            created_at: this.date
          }
        })
        this.attendances = response.data
        loading.hide()
      } catch (error) {}
    }
  }
}
</script>
