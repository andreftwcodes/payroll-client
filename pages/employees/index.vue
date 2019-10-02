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
              <v-icon medium color="green darken-2" @click="onAddNew"
                >add_circle_outline</v-icon
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
                <td>{{ props.item.fullname }}</td>
                <td>{{ props.item.gender }}</td>
                <td>{{ props.item.age }}</td>
                <td>{{ props.item.contact }}</td>
                <td>{{ props.item.birthdate }}</td>
                <td>{{ props.item.hired_at }}</td>
                <td>
                  <v-switch
                    v-model="props.item.status"
                    color="success"
                    hide-details
                    @change="onChangedStatus(props.item.id, $event)"
                  ></v-switch>
                </td>
                <td>
                  <v-icon color="blue darken-2" @click="onView(props.item.id)"
                    >launch</v-icon
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
          text: 'Hired at',
          align: 'left',
          sortable: false,
          value: 'hired_at'
        },
        {
          text: 'Status',
          align: 'left',
          sortable: false,
          value: 'status'
        },
        {
          text: '',
          align: 'left',
          sortable: false,
          value: ''
        }
      ],
      rowsPerPage: [10, 15, 20],
      employees: []
    }
  },
  async asyncData({ app }) {
    const response = await app.$axios.$get('employees')
    return {
      employees: response.data
    }
  },
  methods: {
    onAddNew() {
      this.$router.push({
        name: 'employees-create'
      })
    },
    async onChangedStatus(employeeId, status) {
      try {
        await this.$axios.patch(`employee/status/${employeeId}`, {
          status: status
        })
      } catch (error) {}
    },
    onView(id) {
      this.$router.push({
        name: 'employees-id',
        params: { id: id }
      })
    }
  }
}
</script>
