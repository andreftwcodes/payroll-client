<template>
  <v-dialog v-model="show" persistent width="500">
    <v-card>
      <v-card-title class="headline grey lighten-2">
        Confirmation
      </v-card-title>
      <v-card-text class="subheading">
        Do you really want to delete this transaction ?
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="disabled"
          :loading="loading_confirm_btn"
          @click.prevent="onConfirm"
          color="primary"
          flat
        >
          Confirm
        </v-btn>
        <v-btn :disabled="disabled" @click="show = false" color="primary" flat>
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
    async onConfirm() {
      this.disabled = true
      this.loading_confirm_btn = true
      try {
        const response = await this.$axios.$delete(
          `cash-advance/delete/${this.child.id}`
        )
        this.show = false
        this.disabled = false
        this.loading_confirm_btn = false
        this.$emit('deleted:ca-child', response.data)
      } catch (error) {
        this.disabled = false
        this.loading_confirm_btn = false
      }
    }
  }
}
</script>

<style></style>
