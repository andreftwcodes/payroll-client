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
              <v-text-field v-model="form.title" label="Title"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-switch
                v-model="form.status"
                :label="statusLabel"
                color="success"
                hide-details
              ></v-switch>
            </v-flex>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat type="submit">
              Save
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
      statusLabel: 'Active'
    }
  },
  computed: {
    ...mapGetters({
      contributions: 'contributions/contributions'
    }),
    formattedTitle() {
      return _.toUpper(this.title)
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
    'form.status': function(newVal) {
      this.statusLabel = newVal === true ? 'Active' : 'Inactive'
    },
    title: function(newVal) {
      this.form.flag = newVal
    },
    contribution: function(newVal) {
      this.form = newVal
    }
  },
  methods: {
    ...mapActions({
      appendContribution: 'contributions/appendContribution',
      updateContribution: 'contributions/updateContribution'
    }),
    onCancel() {
      this.show = false
    },
    async submit() {
      this.form.flag = this.title
      try {
        let response = {}

        if (this.form.id === null) {
          response = await this.$axios.$post('hdr-contributions', this.form)
          this.appendContribution(response.data)
        } else {
          response = await this.$axios.$patch(
            `hdr-contributions/${this.form.id}`,
            this.form
          )
          this.updateContribution(response.data)
        }

        this.show = false
      } catch (error) {}
    }
  }
}
</script>

<style></style>
