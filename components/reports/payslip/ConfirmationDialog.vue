<template>
  <v-dialog v-model="show" persistent width="500">
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        Confirmation
      </v-card-title>
      <v-card-text>
        Do you want to close the period?
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click.prevent="onContinue">
          Continue
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
    onContinue() {
      this.show = false
      this.$emit('continue:print')
    }
  }
}
</script>

<style></style>
