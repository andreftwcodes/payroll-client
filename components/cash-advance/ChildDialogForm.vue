<template>
  <v-dialog v-model="show" persistent width="800">
    <v-card>
      <v-card-title class="headline grey lighten-2">
        Credit
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container>
            <v-layout row wrap>
              <v-flex xs12 md4>
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
                      v-model="form.date"
                      label="Date"
                      append-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="form.date"
                    :max="dateNow()"
                    @input="dateMenu = false"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field
                  v-model="form.credit"
                  label="Credit"
                  placeholder="Credit"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field
                  v-model="form.debit"
                  label="Debit"
                  placeholder="Debit"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click="onSaveUpdate">
          Save
        </v-btn>
        <v-btn color="primary" flat @click="show = false">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean
    },
    parent: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      form: {
        ca_parents_id: this.parent.id,
        date: this.dateNow(),
        credit: null
      },
      dateMenu: false
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
  },
  methods: {
    dateNow() {
      const d = new Date()
      return (
        d.getFullYear() +
        '-' +
        ('0' + (d.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + d.getDate()).slice(-2)
      )
    },
    async onSaveUpdate() {
      const response = await this.$axios.$post('cash-advance/store', this.form)
      this.show = false
      this.$emit('save-update:child', response.data)
    }
  }
}
</script>
