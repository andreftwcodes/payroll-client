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
        <v-btn
          v-show="false"
          color="primary"
          nuxt
          :to="{ name: 'settings-deductions-create' }"
          >Add New</v-btn
        >
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="deductions"
        :rows-per-page-items="rowsPerPage"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
          <td v-show="false">
            <v-btn
              small
              color="primary"
              nuxt
              :to="{
                name: 'settings-deductions-id',
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
          text: 'Name',
          align: 'left',
          sortable: false,
          value: 'name'
        }
      ],
      rowsPerPage: [5, 10, 15],
      deductions: []
    }
  },
  async asyncData({ app }) {
    const response = await app.$axios.$get('deductions')
    return {
      deductions: response.data
    }
  },
  methods: {}
}
</script>
