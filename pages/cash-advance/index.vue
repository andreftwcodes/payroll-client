<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-card>
          <v-card-title>
            <v-flex md4>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-flex>
            <v-spacer></v-spacer>
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
              <template v-if="props.item.parent !== null">
                <td>{{ props.item.parent.amount_deductible }}</td>
                <td>{{ props.item.parent.balance }}</td>
              </template>
              <template v-else>
                <td>NA</td>
                <td>NA</td>
              </template>
              <td>
                <v-icon color="blue darken-2" @click="onShow(props.item.id)"
                  >launch</v-icon
                >
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  middleware: 'auth',
  components: {},
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
          text: 'Amount Deductible',
          align: 'left',
          sortable: false,
          value: ''
        },
        {
          text: 'Balance',
          align: 'left',
          sortable: false,
          value: ''
        },
        {
          text: '',
          align: 'left',
          sortable: false,
          value: ''
        }
      ],
      rowsPerPage: [5, 10, 15]
    }
  },
  async asyncData({ app }) {
    const response = await app.$axios.$get('cash-advance/index')
    return {
      employees: response.data
    }
  },
  mounted() {},
  methods: {
    onShow(employeeId) {
      this.$router.push({
        path: `cash-advance/${employeeId}`
      })
    }
  }
}
</script>
