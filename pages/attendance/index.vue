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
                    v-model="employee"
                    :items="employees"
                    item-text="fullname"
                    item-value="id"
                    label="Select"
                    :loading="employee_autocomplete_loading"
                    :readonly="employee_autocomplete"
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
                :disabled="swap_btn"
                @click="onSwap"
                >swap_horiz</v-icon
              >
              <v-spacer></v-spacer>
              <v-flex md3>
                <v-menu
                  v-model="dateMenu"
                  :disabled="date_picker"
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
                    :max="_now()"
                    @input="onChangedDate"
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
                <template v-if="props.item.status">
                  <v-icon
                    color="blue darken-2"
                    @click="showAttendanceDialogForm(props.item)"
                    >edit</v-icon
                  >
                </template>
                <template v-else>
                  <v-chip small color="red" text-color="white">Closed</v-chip>
                </template>
              </td>
            </template>
          </v-data-table>
        </v-card>
        <MessageDialog
          v-model="msgDialog"
          @msg-dialog:closed="employee = null"
        />
        <AttendanceDialogForm
          v-model="dialogForm"
          :attendance="attendance"
          @attendance:updated="attendanceUpdated"
          @attendance:saved="attendanceSaved"
          @attendance:closed="employee = null"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import _ from 'lodash'
import { mapActions } from 'vuex'
import MessageDialog from '@/components/attendance/MessageDialog'
import AttendanceDialogForm from '@/components/attendance/AttendanceDialogForm'
export default {
  middleware: 'auth',
  components: {
    MessageDialog,
    AttendanceDialogForm
  },
  data() {
    return {
      employees: [],
      employee: null,
      search: '',
      employee_autocomplete: false,
      employee_autocomplete_loading: false,
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
      date: this._now(),
      dateMenu: false,
      msgDialog: false,
      dialogForm: false,
      swap: false,
      swap_btn: false,
      date_picker: false
    }
  },
  watch: {
    'errors.employee': function(newValue) {
      if (!_.isEmpty(newValue)) {
        this.msgDialog = true
        this.employee_autocomplete_loading = false
      }
    }
  },
  async asyncData({ app }) {
    const response = await app.$axios.$get('attendances')
    return {
      attendances: response.data
    }
  },
  mounted() {
    this.onChangedDate(true)
  },
  methods: {
    ...mapActions({
      clearErrors: 'validation/clearErrors',
      setSelectedDate: 'attendances/setSelectedDate'
    }),
    onSwap() {
      this.swap = !this.swap
      this.search = null
    },
    async onChangedEmployee(id) {
      this.swap_btn = true
      this.date_picker = true
      this.employee_autocomplete = true
      this.employee_autocomplete_loading = true
      const attendance = _.omit(
        _.merge(_.find(this.employees, ['id', id]), {
          attended_at: this.date
        }),
        ['id', 'fullname']
      )
      try {
        await this.$axios.$get(`attendances/verify-employee/${id}`, {
          params: {
            attended_at: this.date
          }
        })
        this.swap_btn = false
        this.date_picker = false
        this.employee_autocomplete = false
        this.employee_autocomplete_loading = false
        this.showAttendanceDialogForm(attendance)
      } catch (error) {
        this.swap_btn = false
        this.date_picker = false
        this.employee_autocomplete = false
        this.employee_autocomplete_loading = false
      }
    },
    showAttendanceDialogForm(attendance) {
      this.clearErrors()
      this.dialogForm = true
      this.attendance = _.update(
        _.cloneDeep(attendance),
        'time_logs',
        timeLog => {
          return !_.isEmpty(timeLog) ? timeLog : []
        }
      )
    },
    attendanceUpdated(attendance) {
      this.employee = null
      this.attendances.splice(
        _.findIndex(this.attendances, o => o.id === attendance.id),
        1,
        attendance
      )
    },
    attendanceSaved(attendance) {
      this.employee = null
      this.employees.splice(
        _.findIndex(this.employees, ['id', attendance.employee.id]),
        1
      )
      this.attendances.push(attendance)
    },
    async onChangedDate(loader = true) {
      this.dateMenu = false

      let loading = this.$loading

      if (loader) {
        loading = loading.show()
      }

      try {
        const response = await this.$axios.$get('attendances', {
          params: {
            attended_at: this.date
          }
        })
        loading.hide()
        this.setSelectedDate(this.date)
        this.attendances = response.data
        this.employees = response.employees
      } catch (error) {}
    }
  }
}
</script>
