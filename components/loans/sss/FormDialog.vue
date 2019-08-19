<template>
  <div class="text-xs-center">
    <v-dialog v-model="show" width="1000">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Add Loan
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-container>
              <v-layout row wrap>
                <v-flex xs12 md3>
                  <v-text-field
                    label="Loan No."
                    placeholder="Loan No."
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md3>
                  <v-autocomplete
                    :items="[
                      { id: 1, fullname: 'Mickey Mouse' },
                      { id: 2, fullname: 'Mini Mouse' }
                    ]"
                    item-text="fullname"
                    item-value="id"
                    label="Employee"
                    placeholder="Employee"
                    :disabled="disabled"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs12 md3>
                  <v-text-field
                    label="Loaned Amount"
                    placeholder="Loaned Amount"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md3>
                  <v-text-field
                    label="Amortization Amount"
                    placeholder="Amortization Amount"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md3>
                  <v-select
                    :items="[
                      { value: 12, text: '12 Months' },
                      { value: 24, text: '24 Months' }
                    ]"
                    item-text="text"
                    item-value="value"
                    label="Payment Terms"
                    placeholder="Payment Terms"
                    :disabled="disabled"
                  ></v-select>
                </v-flex>
                <v-flex xs12 md3>
                  <v-menu
                    v-model="dateMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="loan_date"
                        label="Loan Date"
                        append-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="loan_date"
                      :max="now()"
                      @input="dateMenu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="show = false">
            Save
          </v-btn>
          <v-btn color="primary" flat @click="show = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean
    }
  },
  data() {
    return {
      dateMenu: false,
      loan_date: this.now()
    }
  },
  computed: {
    show: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>
