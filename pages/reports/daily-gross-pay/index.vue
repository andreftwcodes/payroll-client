<template>
  <div>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="employees"
        :rows-per-page-items="rowsPerPage"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td>{{ props.item.fullname }}</td>
          <td>
            <v-btn
              small
              color="primary"
              nuxt
              :to="{
                name: 'reports-daily-gross-pay-id',
                params: { id: props.item.id }
              }"
              >View</v-btn
            >
          </td>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
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
          text: 'Action',
          align: 'left',
          sortable: false,
          value: 'action'
        }
      ],
      rowsPerPage: [5, 10, 15],
      employees: []
    }
  },
  async asyncData({ app }) {
    const response = await app.$axios.$get('reports/pay/employees')
    return {
      employees: response.data
    }
  }
}
</script>
