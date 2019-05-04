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
        <v-btn color="primary" nuxt :to="{ name: 'employees-create' }"
          >Add New</v-btn
        >
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="employees"
        :rows-per-page-items="rowsPerPage"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td>{{ props.item.firstname }}</td>
          <td>{{ props.item.middlename }}</td>
          <td>{{ props.item.lastname }}</td>
          <td>{{ props.item.gender }}</td>
          <td>{{ props.item.age }}</td>
          <td>{{ props.item.contact }}</td>
          <td>{{ props.item.birthdate }}</td>
          <td>{{ props.item.status }}</td>
          <td>
            <v-btn
              small
              color="primary"
              nuxt
              :to="{ name: 'employees-id', params: { id: props.item.id } }"
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
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Firstname',
          align: 'left',
          sortable: false,
          value: 'firstname'
        },
        {
          text: 'Middlename',
          align: 'left',
          sortable: false,
          value: 'middlename'
        },
        {
          text: 'Lastname',
          align: 'left',
          sortable: false,
          value: 'lastname'
        },
        {
          text: 'Gender',
          align: 'left',
          sortable: false,
          value: 'gender'
        },
        {
          text: 'Age',
          align: 'left',
          sortable: false,
          value: 'age'
        },
        {
          text: 'Contact',
          align: 'left',
          sortable: false,
          value: 'contact'
        },
        {
          text: 'Birthdate',
          align: 'left',
          sortable: false,
          value: 'birthdate'
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
      employees: []
    }
  },
  async asyncData({ app }) {
    const response = await app.$axios.$get('employees')
    return {
      employees: response.data
    }
  }
}
</script>
