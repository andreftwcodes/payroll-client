<template>
  <div class="text-xs-center">
    <v-dialog v-model="show" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Confirmation
        </v-card-title>

        <v-card-text>
          Do you really want to save?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="onConfirmSave">
            Confirm
          </v-btn>
          <v-btn color="primary" flat @click="show = false">
            Cancel
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
    onConfirmSave() {
      this.show = false
      this.$emit('confirm-save')
    }
  }
}
</script>

<style></style>
