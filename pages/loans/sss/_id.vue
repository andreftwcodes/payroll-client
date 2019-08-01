<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-card>
          <v-card-title class="headline pb-2">
            <v-flex>
              #201030507080 - Jose Rizal
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
                      <div class="headline">2018-07-25</div>
                      <div class="font-weight-black">Loaned Date</div>
                    </div>
                  </v-card-title>
                </v-card>
              </v-flex>
              <v-flex xs12 md2>
                <v-card color="teal lighten-1" class="white--text">
                  <v-card-title class="pt-2 pb-2">
                    <div>
                      <div class="headline">10,000</div>
                      <div class="font-weight-black">Loaned Amount</div>
                    </div>
                  </v-card-title>
                </v-card>
              </v-flex>
              <v-flex xs12 md2>
                <v-card color="teal lighten-1" class="white--text">
                  <v-card-title class="pt-2 pb-2">
                    <div>
                      <div class="headline">7,000</div>
                      <div class="font-weight-black">Balance</div>
                    </div>
                  </v-card-title>
                </v-card>
              </v-flex>
              <v-flex xs12 md2>
                <v-card color="teal lighten-1" class="white--text">
                  <v-card-title class="pt-2 pb-2">
                    <div>
                      <div class="headline">60%</div>
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
            :items="payments"
            hide-actions
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td>
                {{ props.index + 1 }}
              </td>
              <td>{{ props.item.date }}</td>
              <td>{{ props.item.remarks }}</td>
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
          text: 'Date',
          align: 'left',
          sortable: false,
          value: 'date'
        },
        {
          text: 'Remarks',
          align: 'left',
          sortable: false,
          value: 'remarks'
        }
      ],
      payments: this.mappedPayments()
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
    mappedPayments() {
      const payments = []

      for (let index = 1; index <= 24; index++) {
        payments.push({
          date: '2019-08-05',
          remarks: 'Paid'
        })
      }

      return payments
    }
  }
}
</script>

<style></style>
