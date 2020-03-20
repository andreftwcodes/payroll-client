<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-card>
          <v-card-title class="headline pb-2">
            <v-flex>
              {{ parent.ref_no }} - {{ parent.employee.fullname }}
            </v-flex>
            <v-spacer></v-spacer>
            <v-icon large color="blue darken-2" @click="onBack"
              >keyboard_backspace</v-icon
            >
          </v-card-title>
          <v-divider class="mb-3"></v-divider>
          <v-card-title class="pt-0 pb-0">
            <v-container fluid grid-list-xl class="pb-0">
              <v-layout row wrap>
                <v-flex xs12 md2>
                  <v-text-field
                    v-model="parent.subject"
                    readonly
                    outline
                    label="Subject"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md2>
                  <v-text-field
                    v-model="loanedAtDateFormatted"
                    readonly
                    outline
                    label="Loaned Date"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md2>
                  <v-text-field
                    v-model="parent.amount_loaned"
                    readonly
                    outline
                    label="Loaned Amount"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md2>
                  <v-text-field
                    v-model="parent.balance"
                    readonly
                    outline
                    label="Balance"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md2>
                  <v-text-field
                    v-model="parent.progress"
                    readonly
                    outline
                    label="Progress"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
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
              <td>{{ props.item.amortization }}</td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from 'moment'
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
          text: 'Amortization',
          align: 'left',
          sortable: false,
          value: 'amortization'
        }
      ]
    }
  },
  computed: {
    loanedAtDateFormatted() {
      return this.parent.loaned_at
        ? moment(this.parent.loaned_at).format('MMMM Do YYYY')
        : ''
    }
  },
  async asyncData({ app, params }) {
    const response = await app.$axios.$get(`loans/government/${params.id}`)
    return {
      parent: response.data
    }
  },
  methods: {
    onBack() {
      this.$router.push({
        name: 'loans-government'
      })
    }
  }
}
</script>

<style></style>
