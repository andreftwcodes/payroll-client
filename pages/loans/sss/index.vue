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
            <v-icon medium color="green darken-2" @click="sssLoanDialogForm()"
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
                {{ props.item.ref_no }}
              </td>
              <td>{{ props.item.employee.fullname }}</td>
              <td>{{ props.item.amount_loaned_dsp }}</td>
              <td>{{ props.item.amortization_amount_dsp }}</td>
              <td>{{ props.item.balance }}</td>
              <td>
                <v-chip
                  :color="props.item.balance == 0 ? 'green' : 'red'"
                  text-color="white"
                  small
                >
                  {{ props.item.progress }}
                </v-chip>
              </td>
              <td>{{ props.item.loaned_dsp }}</td>
              <td>
                <v-icon
                  class="mr-3"
                  color="blue darken-2"
                  @click="onShow(props.item.id)"
                  >launch</v-icon
                >
                <v-icon color="red" @click="onDelete(props.item)"
                  >highlight_off</v-icon
                >
              </td>
            </template>
          </v-data-table>
        </v-card>
        <FormDialog
          v-model="formDialogVisibility"
          :employees="employees"
          @saved-updated:loan="savedUpdatedLoan"
        />
        <DltDialog v-model="dltDialog" @loan-deleted="loanDeleted" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import _ from 'lodash'
import { mapActions } from 'vuex'
import FormDialog from '@/components/loans/sss/FormDialog'
import DltDialog from '@/components/loans/sss/DltDialog'
export default {
  components: {
    FormDialog,
    DltDialog
  },
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Reference No.',
          align: 'left',
          sortable: false,
          value: 'ref_no'
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
          text: 'Amortization',
          align: 'left',
          sortable: false,
          value: 'amortization_amount'
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
          text: 'Loaned at',
          align: 'left',
          sortable: false,
          value: 'loaned_at'
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
      sssLoan: {},
      dltDialog: false
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
    ...mapActions({
      setLoan: 'sss-loan/setLoan',
      clearLoan: 'sss-loan/clearLoan'
    }),
    sssLoanDialogForm() {
      this.formDialogVisibility = true
    },
    savedUpdatedLoan(loan) {
      this.loans.push(loan)
    },
    onShow(id) {
      this.$router.push({
        name: 'loans-sss-id',
        params: { id: id }
      })
    },
    onDelete(loan) {
      this.dltDialog = true
      this.setLoan(loan)
    },
    loanDeleted(id) {
      this.clearLoan()
      this.loans.splice(_.findIndex(this.loans, o => o.id === id), 1)
    }
  }
}
</script>

<style></style>
