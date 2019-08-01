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
            <v-icon medium color="green darken-2" @click="onAddNew"
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
              <td>{{ props.item.fullname }}</td>
              <td>{{ props.item.loaned_amount }}</td>
              <td>{{ props.item.balance }}</td>
              <td>{{ props.item.progress }}</td>
              <td>{{ props.item.loaned_date }}</td>
              <td>
                <v-icon class="mr-3" color="blue darken-2" @click="onShow(1)"
                  >launch</v-icon
                >
                <v-icon color="red" @click="onDelete">highlight_off</v-icon>
              </td>
            </template>
          </v-data-table>
        </v-card>
        <FormDialog v-model="formDialogVisibility" />
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
          value: 'fullname'
        },
        {
          text: 'Loaned Amount',
          align: 'left',
          sortable: false,
          value: 'loaned_amount'
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
          text: 'Loaned Date',
          align: 'left',
          sortable: false,
          value: 'loaned_date'
        },
        {
          text: '',
          align: 'left',
          sortable: false,
          value: ''
        }
      ],
      rowsPerPage: [10, 15, 20],
      loans: this.mappedLoans(),
      formDialogVisibility: false
    }
  },
  methods: {
    onAddNew() {
      this.formDialogVisibility = true
    },
    onShow(id) {
      this.$router.push({
        name: 'loans-sss-id',
        params: { id: id }
      })
    },
    onDelete() {
      console.log('Delete')
    },
    mappedLoans() {
      const loans = [
        {
          loan_no: null,
          fullname: 'Emma Isabella',
          loaned_amount: 18000,
          balance: 15000,
          progress: 30,
          loaned_date: '2019-05-10'
        },
        {
          loan_no: null,
          fullname: 'Abigail Scarlett',
          loaned_amount: 25000,
          balance: 12000,
          progress: 80,
          loaned_date: '2019-06-15'
        },
        {
          loan_no: null,
          fullname: 'Penelope Eleanor',
          loaned_amount: 28000,
          balance: 80000,
          progress: 50,
          loaned_date: '2019-07-03'
        },
        {
          loan_no: null,
          fullname: 'Madison Grace',
          loaned_amount: 18000,
          balance: 15000,
          progress: 30,
          loaned_date: '2019-03-09'
        },
        {
          loan_no: null,
          fullname: 'Zoey Charlotte',
          loaned_amount: 25000,
          balance: 12000,
          progress: 80,
          loaned_date: '2019-01-27'
        },
        {
          loan_no: null,
          fullname: 'Sophia Aurora',
          loaned_amount: 28000,
          balance: 80000,
          progress: 50,
          loaned_date: '2019-05-19'
        },
        {
          loan_no: null,
          fullname: 'Emma Isabella',
          loaned_amount: 18000,
          balance: 15000,
          progress: 30,
          loaned_date: '2019-05-10'
        },
        {
          loan_no: null,
          fullname: 'Abigail Scarlett',
          loaned_amount: 25000,
          balance: 12000,
          progress: 80,
          loaned_date: '2019-06-15'
        },
        {
          loan_no: null,
          fullname: 'Penelope Eleanor',
          loaned_amount: 28000,
          balance: 80000,
          progress: 50,
          loaned_date: '2019-07-03'
        },
        {
          loan_no: null,
          fullname: 'Madison Grace',
          loaned_amount: 18000,
          balance: 15000,
          progress: 30,
          loaned_date: '2019-03-09'
        },
        {
          loan_no: null,
          fullname: 'Zoey Charlotte',
          loaned_amount: 25000,
          balance: 12000,
          progress: 80,
          loaned_date: '2019-01-27'
        },
        {
          loan_no: null,
          fullname: 'Sophia Aurora',
          loaned_amount: 28000,
          balance: 80000,
          progress: 50,
          loaned_date: '2019-05-19'
        },
        {
          loan_no: null,
          fullname: 'Emma Isabella',
          loaned_amount: 18000,
          balance: 15000,
          progress: 30,
          loaned_date: '2019-05-10'
        },
        {
          loan_no: null,
          fullname: 'Abigail Scarlett',
          loaned_amount: 25000,
          balance: 12000,
          progress: 80,
          loaned_date: '2019-06-15'
        },
        {
          loan_no: null,
          fullname: 'Penelope Eleanor',
          loaned_amount: 28000,
          balance: 80000,
          progress: 50,
          loaned_date: '2019-07-03'
        },
        {
          loan_no: null,
          fullname: 'Madison Grace',
          loaned_amount: 18000,
          balance: 15000,
          progress: 30,
          loaned_date: '2019-03-09'
        },
        {
          loan_no: null,
          fullname: 'Zoey Charlotte',
          loaned_amount: 25000,
          balance: 12000,
          progress: 80,
          loaned_date: '2019-01-27'
        },
        {
          loan_no: null,
          fullname: 'Sophia Aurora',
          loaned_amount: 28000,
          balance: 80000,
          progress: 50,
          loaned_date: '2019-05-19'
        },
        {
          loan_no: null,
          fullname: 'Emma Isabella',
          loaned_amount: 18000,
          balance: 15000,
          progress: 30,
          loaned_date: '2019-05-10'
        },
        {
          loan_no: null,
          fullname: 'Abigail Scarlett',
          loaned_amount: 25000,
          balance: 12000,
          progress: 80,
          loaned_date: '2019-06-15'
        },
        {
          loan_no: null,
          fullname: 'Penelope Eleanor',
          loaned_amount: 28000,
          balance: 80000,
          progress: 50,
          loaned_date: '2019-07-03'
        },
        {
          loan_no: null,
          fullname: 'Madison Grace',
          loaned_amount: 18000,
          balance: 15000,
          progress: 30,
          loaned_date: '2019-03-09'
        },
        {
          loan_no: null,
          fullname: 'Zoey Charlotte',
          loaned_amount: 25000,
          balance: 12000,
          progress: 80,
          loaned_date: '2019-01-27'
        },
        {
          loan_no: null,
          fullname: 'Sophia Aurora',
          loaned_amount: 28000,
          balance: 80000,
          progress: 50,
          loaned_date: '2019-05-19'
        }
      ]

      return _.forEach(loans, function(value, key) {
        value.loan_no = Math.floor(Math.random() * Math.floor(Date.now()))
      })
    }
  }
}
</script>

<style></style>
