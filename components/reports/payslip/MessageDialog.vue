<template>
  <div class="text-xs-center">
    <v-dialog v-model="show" persistent width="600">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Error
        </v-card-title>

        <v-card-text class="subheading">
          {{ message }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="onClose">
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
    },
    message: {
      type: String,
      default: ''
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
  },
  methods: {
    onClose() {
      this.show = false
    }
  }
}
</script>
