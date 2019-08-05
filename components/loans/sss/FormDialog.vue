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
                    label="Loan Amount"
                    placeholder="Loan Amount"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md3>
                  <v-text-field
                    label="Loan Date"
                    placeholder="Loan Date"
                  ></v-text-field>
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
    return {}
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
