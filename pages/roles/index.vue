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
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="roles"
        :rows-per-page-items="rowsPerPage"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
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
          text: 'Name',
          align: 'left',
          sortable: false,
          value: 'name'
        }
      ],
      rowsPerPage: [5, 10, 15],
      roles: []
    }
  },
  async asyncData({ app }) {
    const response = await app.$axios.$get('roles')
    return {
      roles: response.data
    }
  }
}
</script>
