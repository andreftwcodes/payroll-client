<template>
  <div class="text-xs-center">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Confirm
        </v-card-title>

        <v-card-text>
          Do you really want to save?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="canceled">
            Cancel
          </v-btn>
          <v-btn color="primary" flat @click="confirmed">
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    confirmed() {
      this.$emit('confirmed-dialog')
    },
    canceled() {
      this.$emit('canceled-dialog')
    }
  }
}
</script>
