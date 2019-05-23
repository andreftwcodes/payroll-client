<template>
  <div>
    <v-card>
      <v-card-title>
        <v-layout row wrap>
          <v-flex md4>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-flex>
          <v-flex md5></v-flex>
          <v-flex md3>
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
                :max="new Date().toISOString().substr(0, 10)"
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
          <td>
            <a
              href="javascript:void(0);"
              @click.prevent="showAttendanceDialogForm(props.item)"
              >{{ props.item.employee.fullname }}</a
            >
          </td>
          <td>{{ props.item.locale.name }}</td>
          <td>{{ props.item.start_dsp }}</td>
          <td>{{ props.item.end_dsp }}</td>
          <td>{{ props.item.remark }}</td>
        </template>
      </v-data-table>
    </v-card>
    <AttendanceDialogForm
      v-model="dialogForm"
      :attendance="attendance"
      @attendance:updated="attendanceUpdated"
    />
  </div>
</template>

<script>
import _ from 'lodash'
import { mapActions } from 'vuex'
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
          value: 'fullname'
        },
        {
          text: 'Locale',
          align: 'left',
          sortable: false,
          value: 'locale'
        },
        {
          text: 'Time In',
          align: 'left',
          sortable: false,
          value: 'lastname'
        },
        {
          text: 'Time Out',
          align: 'left',
          sortable: false,
          value: 'gender'
        },
        {
          text: 'Remark',
          align: 'left',
          sortable: false,
          value: 'gender'
        }
      ],
      rowsPerPage: [5, 10, 15],
      attendances: [],
      attendance: null,
      date: new Date().toISOString().substr(0, 10),
      dateMenu: false,
      dialogForm: false
    }
  },
  async asyncData({ app }) {
    const response = await app.$axios.$get('attendances')
    return {
      attendances: response.data
    }
  },
  created() {
    this.filterDate(false)
  },
  methods: {
    ...mapActions({
      clearErrors: 'validation/clearErrors'
    }),
    showAttendanceDialogForm(attendance) {
      this.clearErrors()
      this.dialogForm = true
      this.attendance = _.clone(attendance)
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
        const response = await this.$axios.$get('attendances', {
          params: {
            created_at: this.date
          }
        })
        loading.hide()
        this.attendances = response.data
      } catch (error) {}
    }
  }
}
</script>
