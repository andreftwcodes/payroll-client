<template>
  <v-container fluid grid-list-xl>
    <v-layout>
      <v-flex xs12 md3>
        <v-card>
          <v-flex xs12 class="pb-0">
            <v-select
              v-model="employee"
              :items="employees"
              item-text="fullname"
              item-value="id"
              label="Employee"
            ></v-select>
          </v-flex>
          <v-flex xs12 class="pt-0 pb-0">
            <v-dialog
              ref="dialog"
              v-model="modalFrom"
              :return-value.sync="dateFrom"
              persistent
              lazy
              full-width
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="dateFrom"
                  label="Period From"
                  append-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="dateFrom" scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="modalFrom = false"
                  >Cancel</v-btn
                >
                <v-btn flat color="primary" @click="$refs.dialog.save(dateFrom)"
                  >OK</v-btn
                >
              </v-date-picker>
            </v-dialog>
          </v-flex>
          <v-flex xs12 class="pt-0 pb-0">
            <v-dialog
              ref="dialog2"
              v-model="modalTo"
              :return-value.sync="dateTo"
              persistent
              lazy
              full-width
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="dateTo"
                  label="To"
                  append-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="dateTo" scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="modalTo = false"
                  >Cancel</v-btn
                >
                <v-btn flat color="primary" @click="$refs.dialog2.save(dateTo)"
                  >OK</v-btn
                >
              </v-date-picker>
            </v-dialog>
          </v-flex>
          <v-flex xs12 class="pt-0">
            <v-btn color="primary" block round @click.prevent="onSearch"
              >Search</v-btn
            >
          </v-flex>
        </v-card>
      </v-flex>
      <v-flex xs12 md9>
        <v-card>
          <v-flex xs12>
            <template v-if="showTable">
              <PaySlipTable :payslip="payslip" />
            </template>
          </v-flex>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import PaySlipTable from '@/components/reports/payslip/PaySlipTable'
export default {
  middleware: 'auth',
  components: {
    PaySlipTable
  },
  data() {
    return {
      employees: [],
      employee: 1,
      dateFrom: new Date().toISOString().substr(0, 10),
      dateTo: new Date().toISOString().substr(0, 10),
      modalFrom: false,
      modalTo: false,
      showTable: false,
      payslip: {}
    }
  },
  async asyncData({ app }) {
    const response = await app.$axios.$get('/reports/payslip/data')
    return {
      employees: response.data
    }
  },
  methods: {
    async onSearch() {
      try {
        const response = await this.$axios.$get(
          `/payslip/period/${this.employee}`,
          {
            params: {
              from: this.dateFrom,
              to: this.dateTo
            }
          }
        )
        this.payslip = response.data
        this.showTable = true
      } catch (error) {}
    }
  }
}
</script>
