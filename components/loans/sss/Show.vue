<template>
  <div>
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-icon medium color="green darken-2">add_circle_outline</v-icon>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="payments"
        :rows-per-page-items="rowsPerPage"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td>
            1
          </td>
          <td>{{ props.item.date }}</td>
          <td>{{ props.item.remarks }}</td>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    return {
      headers: [
        {
          text: '#',
          align: 'left',
          sortable: false,
          value: 'no'
        },
        {
          text: 'Date',
          align: 'left',
          sortable: false,
          value: 'date'
        },
        {
          text: 'Remarks',
          align: 'left',
          sortable: false,
          value: 'remarks'
        }
      ],
      rowsPerPage: [10, 15, 20],
      payments: this.mappedPayments()
    }
  },
  methods: {
    mappedPayments() {
      const payments = [
        {
          date: null,
          remarks: 'Paid'
        },
        {
          date: null,
          remarks: 'Paid'
        },
        {
          date: null,
          remarks: 'Paid'
        },
        {
          date: null,
          remarks: 'Paid'
        },
        {
          date: null,
          remarks: 'Paid'
        },
        {
          date: null,
          remarks: 'Paid'
        },
        {
          date: null,
          remarks: 'Paid'
        },
        {
          date: null,
          remarks: 'Paid'
        },
        {
          date: null,
          remarks: 'Paid'
        },
        {
          date: null,
          remarks: 'Paid'
        }
      ]

      return _.forEach(payments, function(value, key) {
        value.date = Date.now()
      })
    }
  }
}
</script>

<style></style>
