<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-card>
          <v-card-title class="headline pb-2">
            <v-flex>
              {{ parent.loan_no }} - {{ parent.employee.fullname }}
            </v-flex>
            <v-spacer></v-spacer>
            <v-icon large color="blue darken-2" class="mr-3" @click="onBack"
              >keyboard_backspace</v-icon
            >
            <v-icon medium color="blue darken-2" @click="onEdit">edit</v-icon>
          </v-card-title>
          <v-divider class="mb-3"></v-divider>
          <v-card-title class="pt-0 pb-0">
            <v-layout justify-space-between row wrap>
              <v-flex xs12 md2>
                <v-card color="teal lighten-1" class="white--text">
                  <v-card-title class="pt-2 pb-2">
                    <div>
                      <div class="headline">{{ parent.loaned_at }}</div>
                      <div class="font-weight-black">Loaned Date</div>
                    </div>
                  </v-card-title>
                </v-card>
              </v-flex>
              <v-flex xs12 md2>
                <v-card color="teal lighten-1" class="white--text">
                  <v-card-title class="pt-2 pb-2">
                    <div>
                      <div class="headline">{{ parent.amount }}</div>
                      <div class="font-weight-black">Loaned Amount</div>
                    </div>
                  </v-card-title>
                </v-card>
              </v-flex>
              <v-flex xs12 md2>
                <v-card color="teal lighten-1" class="white--text">
                  <v-card-title class="pt-2 pb-2">
                    <div>
                      <div class="headline">{{ parent.balance }}</div>
                      <div class="font-weight-black">Balance</div>
                    </div>
                  </v-card-title>
                </v-card>
              </v-flex>
              <v-flex xs12 md2>
                <v-card color="teal lighten-1" class="white--text">
                  <v-card-title class="pt-2 pb-2">
                    <div>
                      <div class="headline">{{ parent.progress }}</div>
                      <div class="font-weight-black">Progress</div>
                    </div>
                  </v-card-title>
                </v-card>
              </v-flex>
            </v-layout>
          </v-card-title>
          <v-divider class="mt-3"></v-divider>
          <v-data-table
            :headers="headers"
            :items="parent.payments"
            hide-actions
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td>
                {{ props.index + 1 }}
              </td>
              <td>{{ props.item.paid_at }}</td>
              <td>{{ props.item.processed_by }}</td>
              <td>
                <v-icon
                  class="mr-3"
                  color="blue darken-2"
                  @click="onEditPayment(props.item.id)"
                  >edit</v-icon
                >
                <v-icon color="red" @click="onDelete(props.item.id)"
                  >highlight_off</v-icon
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
  data() {
    return {
      headers: [
        {
          text: '#',
          align: 'left',
          sortable: false,
          value: 'no'
        },
        {
          text: 'Paid at',
          align: 'left',
          sortable: false,
          value: 'paid_at'
        },
        {
          text: 'Processed by',
          align: 'left',
          sortable: false,
          value: 'paid_by'
        },
        {
          text: '',
          align: 'left',
          sortable: false,
          value: ''
        }
      ]
    }
  },
  async asyncData({ app, params }) {
    const response = await app.$axios.$get(`sss-loan/show/${params.id}`)
    return {
      parent: response.data
    }
  },
  methods: {
    onBack() {
      this.$router.push({
        name: 'loans-sss'
      })
    },
    onEdit() {
      console.log('Edit')
    },
    onEditPayment(id) {},
    onDelete(id) {}
  }
}
</script>

<style></style>
