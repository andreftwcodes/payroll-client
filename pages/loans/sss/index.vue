<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-card>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-icon
              medium
              color="green darken-2"
              @click="sssLoanDialogForm(null)"
              >add_circle_outline</v-icon
            >
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="loans"
            :rows-per-page-items="rowsPerPage"
            :search="search"
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td>
                {{ props.item.loan_no }}
              </td>
              <td>{{ props.item.employee.fullname }}</td>
              <td>{{ props.item.amount_loaned_dsp }}</td>
              <td>{{ props.item.balance }}</td>
              <td>{{ props.item.progress }}</td>
              <td>{{ props.item.date_loaned }}</td>
              <td>
                <v-icon
                  class="mr-3"
                  color="blue darken-2"
                  @click="onShow(props.item.id)"
                  >launch</v-icon
                >
                <v-icon
                  class="mr-3"
                  color="blue darken-2"
                  @click="sssLoanDialogForm(props.item)"
                  >edit</v-icon
                >
                <v-icon color="red" @click="onDelete">highlight_off</v-icon>
              </td>
            </template>
          </v-data-table>
        </v-card>
        <FormDialog
          v-model="formDialogVisibility"
          :sss-loan="sssLoan"
          :employees="employees"
          @saved-updated:loan="savedUpdatedLoan"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import _ from 'lodash'
import FormDialog from '@/components/loans/sss/FormDialog'
export default {
  components: {
    FormDialog
  },
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Loan No',
          align: 'left',
          sortable: false,
          value: 'loan_no'
        },
        {
          text: 'Fullname',
          align: 'left',
          sortable: false,
          value: 'employee.fullname'
        },
        {
          text: 'Amount Loaned',
          align: 'left',
          sortable: false,
          value: 'amount_loaned'
        },
        {
          text: 'Balance',
          align: 'left',
          sortable: false,
          value: 'balance'
        },
        {
          text: 'Progress',
          align: 'left',
          sortable: false,
          value: 'progress'
        },
        {
          text: 'Date Loaned',
          align: 'left',
          sortable: false,
          value: 'date_loaned'
        },
        {
          text: '',
          align: 'left',
          sortable: false,
          value: ''
        }
      ],
      rowsPerPage: [10, 15, 20],
      formDialogVisibility: false,
      sssLoan: {}
    }
  },
  async asyncData({ app }) {
    const response = await app.$axios.$get('sss-loan/resource')
    return {
      loans: response.data,
      employees: response.employees
    }
  },
  methods: {
    sssLoanDialogForm(obj = null) {
      this.formDialogVisibility = true
      const sssLoan = _.clone(obj)
      this.sssLoan = !_.isNull(sssLoan)
        ? _.merge(sssLoan, {
            employee_id: sssLoan.employee.id,
            loan_no_dsp: sssLoan.loan_no
          })
        : {}
    },
    savedUpdatedLoan(loan) {
      if (_.find(this.loans, ['id', loan.id])) {
        this.loans.splice(
          _.findIndex(this.loans, o => o.id === loan.id),
          1,
          loan
        )
      } else {
        this.loans.push(loan)
      }
    },
    onShow(id) {
      this.$router.push({
        name: 'loans-sss-id',
        params: { id: id }
      })
    },
    onDelete() {
      console.log('Delete')
    }
  }
}
</script>

<style></style>
