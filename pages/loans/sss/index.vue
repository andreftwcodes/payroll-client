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
              <td>{{ props.item.employee.fullname }}</td>
              <td>{{ props.item.amount }}</td>
              <td>{{ props.item.balance }}</td>
              <td>{{ props.item.progress }}</td>
              <td>{{ props.item.loaned_at }}</td>
              <td>
                <v-icon
                  class="mr-3"
                  color="blue darken-2"
                  @click="onShow(props.item.id)"
                  >launch</v-icon
                >
                <v-icon color="red" @click="onDelete">highlight_off</v-icon>
              </td>
            </template>
          </v-data-table>
        </v-card>
        <FormDialog v-model="formDialogVisibility" :sss-loan="sssLoan" />
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
          text: 'Loaned Amount',
          align: 'left',
          sortable: false,
          value: 'amount'
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
      sssLoan: {}
    }
  },
  async asyncData({ app }) {
    const response = await app.$axios.$get('sss-loan')
    return {
      loans: response.data
    }
  },
  methods: {
    onAddNew(obj = null) {
      this.formDialogVisibility = true
      const sssLoan = _.clone(obj)
      this.sssLoan = !_.isNull(sssLoan) ? sssLoan : {}
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
