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
              <v-icon @click="onAddNew" medium color="green darken-2"
                >add_circle_outline</v-icon
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
                  <v-icon
                    @click="onView(props.item.id)"
                    medium
                    color="blue darken-2"
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
          value: 'name'
        },
        {
          text: 'Username',
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
  methods: {
    onAddNew() {
      this.$router.push({
        name: 'users-create'
      })
    },
    onView(id) {
      this.$router.push({
        name: 'users-id',
        params: { id: id }
      })
    }
  }
}
</script>
