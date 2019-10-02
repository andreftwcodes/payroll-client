<template>
  <div class="text-xs-center">
    <v-dialog v-model="show" persistent width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Confirmation
        </v-card-title>

        <v-card-text class="subheading">
          Do you really want to delete this attendance ?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            :disabled="disabled"
            :loading="loading_confirm_btn"
            @click="onConfirm"
          >
            Confirm
          </v-btn>
          <v-btn color="primary" flat :disabled="disabled" @click="onClose">
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
    return {
      disabled: false,
      loading_confirm_btn: false
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
    onConfirm() {
      this.disabled = true
      this.loading_confirm_btn = true
    },
    onClose() {
      this.show = false
    }
  }
}
</script>
