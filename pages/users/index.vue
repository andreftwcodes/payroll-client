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
              <v-btn color="primary" nuxt :to="{ name: 'users-create' }"
                >Add New</v-btn
              >
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="users"
              :rows-per-page-items="rowsPerPage"
              :search="search"
              class="elevation-1"
            >
              <template v-slot:items="props">
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.email }}</td>
                <td>active</td>
                <td>
                  <v-btn
                    small
                    color="primary"
                    nuxt
                    :to="{ name: 'users-id', params: { id: props.item.id } }"
                    >View</v-btn
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
          value: 'name'
        },
        {
          text: 'Email address',
          align: 'left',
          sortable: false,
          value: 'email'
        },
        {
          text: 'Status',
          align: 'left',
          sortable: false,
          value: 'status'
        },
        {
          text: 'Action',
          align: 'left',
          sortable: false,
          value: 'action'
        }
      ],
      rowsPerPage: [5, 10, 15],
      users: []
    }
  },
  async asyncData({ app }) {
    const response = await app.$axios.$get('users')
    return {
      users: response.data
    }
  },
  methods: {}
}
</script>
