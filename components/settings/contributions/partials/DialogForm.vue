<template>
  <div class="text-xs-center">
    <v-dialog v-model="show" width="500">
      <v-card>
        <v-form ref="form" @submit.prevent="submit">
          <v-card-title class="headline grey lighten-2">
            {{ formattedTitle }}
          </v-card-title>

          <v-card-text>
            <v-flex xs12>
              <v-text-field
                v-model="form.title"
                :error-messages="errors.title ? errors.title[0] : ''"
                label="Title"
              ></v-text-field>
            </v-flex>
            <v-flex>
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
                    :value="usedAtDisplay"
                    :error-messages="errors.used_at ? errors.used_at[0] : ''"
                    label="Date use"
                    append-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="form.used_at"
                  :max="_now()"
                  type="month"
                  @input="dateMenu = false"
                ></v-date-picker>
              </v-menu>
            </v-flex>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat type="submit">
              {{ hasExists ? 'Update' : 'Save' }}
            </v-btn>
            <v-btn color="primary" flat @click="onCancel">
              Cancel
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    value: {
      type: Boolean
    },
    title: {
      type: String,
      default: 'sss'
    },
    contribution: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      form: this.contribution,
      dateMenu: false
    }
  },
  computed: {
    ...mapGetters({
      contributions: 'contributions/contributions'
    }),
    hasExists() {
      return _.has(this.form, ['id'])
    },
    formattedTitle() {
      return _.toUpper(this.title)
    },
    usedAtDisplay() {
      return moment(this.form.used_at).format('MMMM YYYY')
    },
    show: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  watch: {
    title: function(newVal) {
      this.form.flag = newVal
    },
    contribution: function(newVal) {
      this.form = newVal
    }
  },
  methods: {
    ...mapActions({
      clearErrors: 'validation/clearErrors',
      appendContribution: 'contributions/appendContribution',
      updateContribution: 'contributions/updateContribution'
    }),
    onCancel() {
      this.show = false
      this.clearErrors()
    },
    async submit() {
      this.form.flag = this.title
      try {
        let response = {}

        if (this.hasExists) {
          response = await this.$axios.$patch(
            `hdr-contributions/${this.form.id}`,
            this.form
          )
          this.updateContribution(response.data)
        } else {
          response = await this.$axios.$post('hdr-contributions', this.form)
          this.appendContribution(response.data)
        }

        this.show = false
      } catch (error) {}
    }
  }
}
</script>

<style></style>
