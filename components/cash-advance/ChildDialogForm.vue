<template>
  <v-dialog v-model="show" persistent width="800">
    <v-card v-if="child">
      <v-card-title class="headline grey lighten-2">
        Credit / Debit
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
                      v-model="child.date"
                      :disabled="disabled"
                      label="Date"
                      append-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="child.date"
                    :max="_now()"
                    @input="dateMenu = false"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field
                  v-model="child.credit"
                  :disabled="disabled"
                  label="Credit"
                  append-icon="money"
                  placeholder="00.00"
                  :error-messages="errors.credit ? errors.credit[0] : ''"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field
                  v-model="child.debit"
                  :disabled="disabled"
                  label="Debit"
                  append-icon="money"
                  placeholder="00.00"
                  :error-messages="errors.debit ? errors.debit[0] : ''"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          flat
          :disabled="disabled"
          :loading="loading_save_update_btn"
          @click="onSaveUpdate"
        >
          {{ hasId ? 'Update' : 'Save' }}
        </v-btn>
        <v-btn color="primary" flat :disabled="disabled" @click="onCancel">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import _ from 'lodash'
import { mapActions } from 'vuex'
export default {
  props: {
    value: {
      type: Boolean
    },
    child: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      disabled: false,
      dateMenu: false,
      loading_save_update_btn: false
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
    },
    hasId() {
      return _.has(this.child, ['id'])
    }
  },
  methods: {
    ...mapActions({
      clearErrors: 'validation/clearErrors'
    }),
    async onSaveUpdate() {
      let response = null

      try {
        this.disabled = true
        this.loading_save_update_btn = true
        if (this.hasId) {
          response = await this.$axios.$patch(
            `cash-advance/update/${this.child.id}`,
            this.child
          )
        } else {
          response = await this.$axios.$post('cash-advance/store', this.child)
        }

        this.disabled = false
        this.loading_save_update_btn = false

        this.show = false
        this.$emit('save-update:child', response)
      } catch (error) {
        this.disabled = false
        this.loading_save_update_btn = false
      }
    },
    onCancel() {
      this.show = false
      this.clearErrors()
    }
  }
}
</script>
