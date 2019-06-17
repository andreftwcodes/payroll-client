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
              <v-spacer></v-spacer>
              <v-btn color="primary" nuxt :to="{ name: 'schedules-create' }"
                >Add New</v-btn
              >
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="schedules"
              :rows-per-page-items="rowsPerPage"
              :search="search"
              class="elevation-1"
            >
              <template v-slot:items="props">
                <td>{{ props.item.first_quarter }}</td>
                <td>{{ props.item.second_quarter }}</td>
                <td>{{ props.item.shift }}</td>
                <td>{{ props.item.status }}</td>
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
          text: '1st Quarter',
          align: 'left',
          sortable: false,
          value: 'firstname'
        },
        {
          text: '2nd Quarter',
          align: 'left',
          sortable: false,
          value: 'firstname'
        },
        {
          text: 'Shift',
          align: 'left',
          sortable: false,
          value: 'firstname'
        },
        {
          text: 'Status',
          align: 'left',
          sortable: false,
          value: 'status'
        }
      ],
      rowsPerPage: [5, 10, 15],
      schedules: []
    }
  },
  async asyncData({ app }) {
    const response = await app.$axios.$get('schedules')
    return {
      schedules: response.data
    }
  }
}
</script>
