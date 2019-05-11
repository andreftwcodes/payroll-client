<template>
  <div>
    <v-card>
      <v-card-title>
        <h1>{{ extra.fullname }}</h1>
        <v-spacer></v-spacer>
        <v-btn color="primary" nuxt :to="{ name: 'reports-daily-gross-pay' }"
          >Back</v-btn
        >
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="payData"
        :rows-per-page-items="rowsPerPage"
        :hide-actions="false"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td>{{ props.item.dateDisplay }}</td>
          <td>{{ props.item.remark }}</td>
          <td>{{ props.item.grossPay }}</td>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Date',
          align: 'left',
          sortable: false,
          value: ''
        },
        {
          text: 'Remark',
          align: 'left',
          sortable: false,
          value: 'remark'
        },
        {
          text: 'Gross Pay',
          align: 'left',
          sortable: false,
          value: 'pay'
        }
      ],
      rowsPerPage: [5, 10, 15],
      payData: [],
      extra: {}
    }
  },
  async asyncData({ app, params }) {
    const response = await app.$axios.$get(`reports/pay/${params.id}`)
    return {
      payData: response.data,
      extra: response.extra
    }
  }
}
</script>
