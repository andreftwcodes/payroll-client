<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap>
      <v-flex>
        <v-card>
          <v-card-title class="pb-0">
            <v-layout row wrap>
              <v-flex md3>
                <v-text-field
                  v-model="timesheet.fullname"
                  readonly
                  outline
                  label="Fullname"
                ></v-text-field>
              </v-flex>
              <v-flex md2>
                <v-text-field
                  v-model="timesheet.period"
                  readonly
                  outline
                  label="Period"
                ></v-text-field>
              </v-flex>
              <v-flex md2>
                <v-text-field
                  v-model="timesheet.total_hours"
                  readonly
                  outline
                  label="Total Hours"
                ></v-text-field>
              </v-flex>
              <v-spacer></v-spacer>
              <v-icon
                v-show="timesheet.attendances.length"
                color="red darken-2"
                class="pa-2"
                @click="onPrint"
                >print</v-icon
              >
              <v-icon
                color="blue darken-2"
                class="pa-2"
                @click="openFilterDialog"
                >settings_input_component</v-icon
              >
            </v-layout>
          </v-card-title>
          <v-divider></v-divider>
          <v-card>
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="timesheet.attendances"
                :rows-per-page-items="rowsPerPage"
                hide-actions
                class="elevation-1"
              >
                <template v-slot:items="props">
                  <td>{{ props.item.date }}</td>
                  <td>{{ props.item.locale.name }}</td>
                  <td>{{ props.item.hours_dsp }}</td>
                  <td>{{ props.item.remarks }}</td>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-card>
      </v-flex>
      <FilterDialog
        v-model="filterDialog"
        :employees="employees"
        @filtered:timesheet="filteredTimeSheet"
      />
    </v-layout>
  </v-container>
</template>

<script>
import { payslipMixin } from '@/plugins/mixins/payslip.js'
import FilterDialog from '@/components/reports/timesheet/FilterDialog'
export default {
  components: {
    FilterDialog
  },
  mixins: [payslipMixin],
  middleware: 'auth',
  data() {
    return {
      headers: [
        {
          text: 'Date',
          align: 'left',
          sortable: false,
          value: 'date'
        },
        {
          text: 'Locale',
          align: 'left',
          sortable: false,
          value: 'locale'
        },
        {
          text: 'Hours',
          align: 'left',
          sortable: false,
          value: 'hours_dsp'
        },
        {
          text: 'Remarks',
          align: 'left',
          sortable: false,
          value: 'remarks'
        }
      ],
      rowsPerPage: [5, 10, 15],
      filterDialog: false,
      timesheet: {
        attendances: []
      }
    }
  },
  async asyncData({ app }) {
    const response = await app.$axios.$get('reports/timesheet')
    return {
      employees: response.data
    }
  },
  methods: {
    openFilterDialog() {
      this.filterDialog = true
    },
    filteredTimeSheet(timesheet) {
      this.timesheet = timesheet
    },
    onPrint() {
      this.payslipDialog(this.timesheet.print_url)
    }
  }
}
</script>
