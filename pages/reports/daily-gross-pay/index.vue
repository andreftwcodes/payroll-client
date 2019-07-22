<template>
  <div>
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
                  <v-icon
                    medium
                    color="blue darken-2"
                    @click="onView(props.item.id)"
                    >remove_red_eye</v-icon
                  >
                </td>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
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
  },
  methods: {
    onView(id) {
      this.$router.push({
        name: 'reports-daily-gross-pay-id',
        params: { id: id }
      })
    }
  }
}
</script>
