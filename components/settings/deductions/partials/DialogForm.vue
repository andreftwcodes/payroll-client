<template>
  <div class="text-xs-center">
    <v-dialog v-model="show" width="500">
      <v-card>
        <v-form ref="form" @submit.prevent="submit">
          <v-card-title class="headline grey lighten-2" primary-title>
            {{ title }}
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
            <v-btn color="primary" flat @click="show = false">
              Cancel
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialog: false,
      form: {
        title: '',
        satus: true
      },
      statusLabel: ''
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
  watch: {
    'form.status': function(newVal) {
      this.statusLabel = newVal === true ? 'Active' : 'Inactive'
    }
  },
  methods: {
    submit() {
      console.log(this.form)
    }
  }
}
</script>

<style></style>
